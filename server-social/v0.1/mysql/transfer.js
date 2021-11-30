var zalo = require("../zalo/zalopay")
const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'lananh',
    password: env.DB_PASSWORD || '123456',
    database: env.DB_NAME || 'httt',
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT || 2,
    queueLimit: 0,
    debug: env.DB_DEBUG || false
  },
};

const mysql = require('mysql2/promise');
// const config = require('./config2');

async function createOrder(connecter_id,taget_id,money) {

  const tax = Math.round( money/10 )
  const coin = money - tax
  console.log("tax: "+tax+ " coin: "+coin)
  const account = []
  account.push(connecter_id)
  account.push(taget_id)

  const connection = await mysql.createConnection(config.db);
  //B1 Set transaction level read committed
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await connection.execute(
    'DO SLEEP(1)'
  )
  //B2 Start the transaction
  await connection.beginTransaction();
  try {
    //B3 Clock rows of 3 account send, get, tax
    await connection.execute('SELECT id, username FROM users WHERE id IN (?,?) FOR UPDATE', account);
    await connection.execute('SELECT id, username FROM users WHERE username="tax" FOR UPDATE');
    //B4 Read data of 3 account send, get, tax
    const [accSend,] = await connection.execute(
      `SELECT id, username, name, balance from users WHERE id = ${account[0]}`
    );
    const [accGet,] = await connection.execute(
      `SELECT id, username, name, balance from users WHERE id = ${account[1]}`
    );
    const [accTax,] = await connection.execute(
      `SELECT id, username, name, balance from users WHERE username = "tax"`
    );

    if(connecter_id==taget_id){ //duplicate user
      const errDuplicate = `{"status":0, "code":"${accSend[0].name} don't transfer money", "action":"Rollback !"}`;
      throw new Error(errDuplicate);
    }
    if(money>accSend[0].balance){ //not enough money
      const errEnough = `{"status":0, "code":"${accSend[0].name} don't have enough money", "action":"Rollback !"}`;
      throw new Error(errEnough);
    }

    // B5 Update balance for user send, get, tax
    await connection.execute(
      `UPDATE users SET balance = balance - ${money} WHERE id = ${account[0]} `
      )
    await connection.execute(
      `UPDATE users SET balance = balance + ${coin} WHERE id = ${account[1]} `
    )
    await connection.execute(
      `UPDATE users SET balance = balance + ${tax} WHERE username = "tax" `
    )
    await connection.execute(
      `INSERT INTO transactions (connecter_id,  target_id, coin, text)`+
      ` VALUES ('${account[0]}','${account[1]}','${coin}', 'thưởng')`
    )
    await connection.execute(
      `INSERT INTO transactions (connecter_id, target_id, coin, text)`+
      ` VALUES ('${account[0]}', '${accTax[0].id}', '${tax}', 'thuế')`
    )

    //Read Money update and check total
    const [moneyUpdate,] = await connection.execute(
      'SELECT balance from users WHERE id IN (?, ?) ORDER BY id',
      account
    );
    const totalSatrt = accSend[0].balance + accGet[0].balance
    const totalEnd = moneyUpdate[0].balance + moneyUpdate[1].balance + tax
    console.log("start: "+totalSatrt+ " end: "+totalEnd)
    if(totalSatrt != totalEnd){
      const errTotal = `{"status":0, "code":"money don't logic", "action":"Rollback !"}`;
      throw new Error(errTotal);
    }

    // B6 Commit the transaction
    await connection.commit();
    const result = `{"status":1, "code":"${accSend[0].name} send ${accGet[0].name} ${money} Coin success"}`;
    const resultJson = JSON.parse(result);
    return resultJson;

  } catch (err) {
    //B7 Rollback successful
    connection.rollback();
    function checkErr(){
      if((err.message).includes("Rollback !")){
        // console.log("ton tai code")
         return JSON.parse(err.message);
      }else{
         return  {status: 0, code:"Not found", "action":"Rollback !"};
      }
    }
    return checkErr(err);
  }
}

async function moneyIncrement(user_id, coin) {
  const connection = await mysql.createConnection(config.db);
  //B1 Set transaction level read committed
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await connection.execute(
    'DO SLEEP(1)'
  )
  //B2 Start the transaction
  await connection.beginTransaction();

 try{
   //B3 Block row and read balance
   await connection.execute("SELECT id, username, balance "+
         " FROM users WHERE id='"+user_id+"' FOR UPDATE")
   const [balance_old,] = await connection.execute(
     `SELECT balance FROM users WHERE id = ${user_id} `
     )
  //B4 Update balance
  await connection.execute(
    `UPDATE users SET balance = balance + ${coin} WHERE id = ${user_id} `
    )
  //B5 Read new balance
  const [balance_new,] = await connection.execute(
    `SELECT balance FROM users WHERE id = ${user_id} `
    )
  //B6 Update transaction
  const [idInMoney,] = await connection.execute(`SELECT id FROM users `+
            ` WHERE username = "inmoney" `)
   // console.log(idInMoney[0].id) //id of InMoney
  await connection.execute(
    `INSERT INTO transactions (connecter_id, target_id, coin, text)`+
    ` VALUES ('${user_id}', '${idInMoney[0].id}', '${coin}', 'nạp tiền')`
  )
  //B7 commit
  await connection.commit();
  const result = {
          status: 1,
          balance_old: balance_old[0].balance,
          balance_new: balance_new[0].balance
        }
  console.log(result)
  return result
 }catch(err){
   connection.rollback();
   return {status: 0}
  }
}
async function blockMoney(user_id){
  const connection = await mysql.createConnection(config.db);
  var sql = " SELECT SUM(b.benefit) as lockmoney"+
            " FROM tasks as a, status as b "+
            " WHERE a.date_start IS NOT NULL AND "+
            " a.target_id='"+user_id+"'"+
            " AND (a.status_ta='0'   OR a.confirm_st='0')"+
            " AND a.id_st = b.id_st"
  const [block,] = await connection.execute(sql)
  // console.log(typeof(block[0].lockmoney))
  return block[0].lockmoney ?
      {lockmoney: parseInt(block[0].lockmoney)} :
      {lockmoney: 0}
}
async function moneyDecrement(user_id, coin) {
  const connection = await mysql.createConnection(config.db);
  //B1 Set transaction level read committed
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await connection.execute(
    'DO SLEEP(1)'
  )
  //B2 Start the transaction
  await connection.beginTransaction();

 try{
   //B3 Block row and read balance
   await connection.execute("SELECT id, username, balance "+
         " FROM users WHERE id='"+user_id+"' FOR UPDATE")
   const [balance_old] = await connection.execute(
     `SELECT balance FROM users WHERE id = ${user_id} `)

  //B4 Read block money
  const block = await blockMoney(user_id)
  // console.log(block) //{ lockmoney: 60 }

  // console.log(typeof(coin))
  if(block.lockmoney + coin > balance_old[0].balance) {
    const errBlock = `{"status":0, "code": "số tiền rút không hợp lệ"}`
    throw new Error(errBlock);
    // return  errBlock
  }
  //B5 update balance and cash
  await connection.execute(
    `UPDATE users SET balance = balance - ${coin}, cash = cash+ ${coin}`+
    ` WHERE id = ${user_id} `
    )
  const [balance_new,] = await connection.execute(
    `SELECT balance FROM users WHERE id = ${user_id} `)

  //B6 Update transaction
  const [idOutMoney,] = await connection.execute(`SELECT id FROM users `+
            ` WHERE username = "outmoney" `)
   // console.log(idInMoney[0].id) //id of InMoney
  await connection.execute(
    `INSERT INTO transactions (connecter_id, target_id, coin, text)`+
    ` VALUES ('${user_id}', '${idOutMoney[0].id}', '${coin}', 'rút tiền')`
  )

  //B7 comit
  await connection.commit();
  const result = {
          status: 1,
          balance_old: balance_old[0].balance,
          balance_new: balance_new[0].balance
        }
  console.log(result)
  return result
 }catch(err){
   connection.rollback();
   function checkErr(){
       if((err.message).includes("rút")){
         // console.log("ton tai code")
          return JSON.parse(err.message);
       }else{
          return  {status: 0, code:"Not found", "action":"Rollback !"};
       }
     }
     return checkErr(err);
  }
}
async function moneyDecrement2(user_id, coin, zptransid) {
  const connection = await mysql.createConnection(config.db);
  //B1 Set transaction level read committed
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await connection.execute(
    'DO SLEEP(1)'
  )
  //B2 Start the transaction
  await connection.beginTransaction();

 try{
   //B3 Block row and read balance
   await connection.execute("SELECT id, username, balance "+
         " FROM users WHERE id='"+user_id+"' FOR UPDATE")
   const [balance_old] = await connection.execute(
     `SELECT balance FROM users WHERE id = ${user_id} `)

  //B4 Read block money
  const block = await blockMoney(user_id)
  // console.log(block) //{ lockmoney: 60 }

  // console.log(typeof(coin))
  if(block.lockmoney + coin > balance_old[0].balance) {
    const errBlock = `{"status":0, "code": "số tiền rút không hợp lệ"}`
    throw new Error(errBlock);
    // return  errBlock
  }
  //B5 rut tien zalopay

  let resultZalo = await zalo.rutTien(user_id, coin, zptransid)
  console.log(resultZalo)
  if(resultZalo.status === 0){
    const errZalo = `{"status":0, "code": "Lỗi rút tiền ZaloPay"}`
    throw new Error(errZalo);
  }
  //B5 update balance and cash
  await connection.execute(
    `UPDATE users SET balance = balance - ${coin}, cash = cash+ ${coin}`+
    ` WHERE id = ${user_id} `
    )
  const [balance_new,] = await connection.execute(
    `SELECT balance FROM users WHERE id = ${user_id} `)

  //B6 Update transaction
  const [idOutMoney,] = await connection.execute(`SELECT id FROM users `+
            ` WHERE username = "outmoney" `)
   // console.log(idInMoney[0].id) //id of InMoney
  await connection.execute(
    `INSERT INTO transactions (connecter_id, target_id, coin, text)`+
    ` VALUES ('${user_id}', '${idOutMoney[0].id}', '${coin}', 'rút tiền')`
  )

  //B7 comit
  await connection.commit();
  const result = {
          status: 1,
          balance_old: balance_old[0].balance,
          balance_new: balance_new[0].balance
        }
  console.log(result)
  return result
 }catch(err){
   connection.rollback();
   function checkErr(){
       if((err.message).includes("rút")){
         // console.log("ton tai code")
          return JSON.parse(err.message);
       }else{
          return  {status: 0, code:"Not found", "action":"Rollback !"};
       }
     }
     return checkErr(err);
  }
}
exports.transfer = async function(connecter_id, target_id, coin,
  callBackTransfer) {
  callBackTransfer(await createOrder(connecter_id, target_id, coin))
  // console.log(await createOrder("1","2",200));
  // process.exit(0);
};

exports.inMoney = async function(user_id, coin, callBackMoney){
  var error = { status: 0 }
   if(!user_id || isNaN(user_id) || !coin || isNaN(coin)){
     return callBackMoney(error)
   }
   return callBackMoney(await moneyIncrement(user_id, coin))
}

exports.outMoney = async function(user_id, coin, callBackMoney){
  var error = { status: 0 }
   if(!user_id || isNaN(user_id) || !coin || isNaN(coin)){
     return callBackMoney(error)
   }
  return callBackMoney(await moneyDecrement(user_id, coin))
}

exports.rutTien = async function(user_id, coin, zptransid, callBackMoney){
  var error = { status: 0 }
   if(!user_id || isNaN(user_id) || !coin || isNaN(coin)
      || isNaN(zptransid)){
     return callBackMoney(error)
   }

   return callBackMoney(await moneyDecrement2(user_id, coin, zptransid))
}
