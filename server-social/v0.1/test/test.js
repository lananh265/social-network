
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "httt"
})
connection.connect(function(err){
  if(!err){console.log("Database is connected !!")
  }else{console.log("Database connect fail !!")}
})

var obNap = {
id: 838,
phone: "0978912207",
name: "PHẠM MINH TỶ",
amount: 100,
comment: "",
io: 1,
lastupdate: "2021-12-05T06:16:20.000Z",
ownername: "",
ownerphone: "",
ownercomment: "nap tien",
serverupdate: "2021-12-05T09:10:08.000Z",
upbalance: 0,
lastupdate2: "2021-12-05 13:16:20",
serverupdate2: "2021-12-05 16:10:08"
}

function checkExistPhone(phone, callBackPhone){
  if(phone == "01214964817"){
    callBackPhone(false)
  }
  sql = "SELECT * FROM users WHERE phone='"+phone+"' "
  connection.query(sql,
    function(err, result, field){
    if(!err){
      // console.log(result)
      if(result[0]){
        callBackPhone(result[0].id)
      }else{
        callBackPhone(false)
      }
    }else{
      callBackPhone(false)
    }
  })
}
function updateBalance(phone, amount, callBackBalance){
  // console.log(amount)
  sql = "UPDATE users SET balance=balance+'"+amount+"' WHERE phone='"+phone+"'"
  connection.query(sql,
    function(err, result, field){
    if(!err){
        callBackBalance(true)
    }else{
      // console.log(err)
      callBackBalance(false)
    }
  })
}
function transactions(connecter_id, amount, callBackTransaction){
  var sql = "INSERT INTO transactions (connecter_id, target_id, coin, text)"+
  " VALUES ('"+connecter_id+"', '2', '"+amount+"', 'nạp tiền')"
  connection.query(sql,
    function(err,result, filed){
      if(!err){
          callBackTransaction(true)
      }else{
        console.log(err)
        callBackTransaction(false)
      }
    })
}
function finishedUpdateBalance(lastupdate,phone, callBackUpdate){
  var sql = "UPDATE historymomo SET upbalance = '1' WHERE lastupdate='"+lastupdate+"' "+
    " AND phone='"+phone+"'"
  connection.query(sql,
    function(err,result, filed){
      if(!err){
          callBackUpdate(true)
      }else{
        console.log(err)
        callBackUpdate(false)
      }
    })
}
function addBalance(ob,callBackBalance){
  if(ob.io==1 && !ob.upbalance){
    checkExistPhone(ob.phone, function(resultPhone){
      if(resultPhone){
        updateBalance(ob.phone, ob.amount, function(resultBalance){
          if(resultBalance){
            transactions(resultPhone, ob.amount, function(resultTransaction){
              if(resultTransaction){
                finishedUpdateBalance(ob.lastupdate2, ob.phone, function(resultFinished){
                  console.log(resultFinished)
                })
              }
            })
          }
        })
      }
    })
  }
}


addBalance(obNap)
