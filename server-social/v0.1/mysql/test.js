const axios = require('axios')
const mysql = require('mysql2/promise');
// const config = require('./config2');
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



async function sendMoney(phone){
  const params = new URLSearchParams()
  params.append('chuyenkhoan', 'chuyen tien')
  params.append('to', phone)
  params.append('amount', 100)//number
  params.append('comment', 'tra luong')
  params.append('name', '')
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const url = 'https://tyaiti.000webhostapp.com/momolananh/checkHistory.php'
  axios.post(url, params, config)
    .then((result) => {
      console.log(result)
      let str = result.data
      let format = str.slice(91, 91) + str.slice(92);
      let ob = JSON.parse(format)
      console.log(ob)
    })
    .catch((err) => {
      console.log(err)
    })
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

async function transfer(id, calBackTransfer){
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
     await connection.execute("SELECT id, username, balance, cashout "+
           " FROM users WHERE id='"+id+"' FOR UPDATE")
     const [balance_old,] = await connection.execute(
       `SELECT phone, balance, cashout FROM users WHERE id = ${id} `)
       //  [ { balance: 1300, cashout: 10 } ]
    //B4 Check block
     var oblock = await blockMoney(id) //{ lockmoney: 0 }
     if(  parseInt(balance_old[0].cashout)
        + parseInt(oblock.lockmoney) > balance_old[0].balance){
       throw {status: 0, code: "Số tiền không hợp lệ"}
     }
     //B5 update balance
     await connection.execute(`UPDATE users SET
       balance= balance - ${parseInt(balance_old[0].cashout)}
       , cashout = cashout -  ${parseInt(balance_old[0].cashout)}`)
    //B6 update transaction
    await connection.execute(`INSERT INTO transactions
      (connecter_id, target_id, coin, text)
      VALUES (${id}, 2, ${parseInt(balance_old[0].cashout)}, "rút tiền")`)
    var sendMoMo = await sendMoney(balance_old[0].phone)
    await connection.commit();
    return calBackTransfer({status: 1, code: "Rút tiền thành công"})
  }catch(err){
     console.log(err)
     connection.rollback();
     return calBackTransfer({status: 0})
  }

}

// transfer(1)
