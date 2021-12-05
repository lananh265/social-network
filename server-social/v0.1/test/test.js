
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
//--------------------------------------------

function blockMoney(id , callBackBlock){
  var sql = " SELECT SUM(b.benefit) as lockmoney"+
            " FROM tasks as a, status as b "+
            " WHERE a.date_start IS NOT NULL AND "+
            " a.target_id='"+id+"'"+
            " AND (a.status_ta='0'   OR a.confirm_st='0')"+
            " AND a.id_st = b.id_st"
  connection.query(sql,
  function(err,results,field){
    if(!err){
      // console.log(results[0].lockmoney)
        if(results[0].lockmoney){
          return results[0].lockmoney
        }else{
          return callBackBlock(0)
        }
    }else{
      // console.log(err)
      return callBackBlock(0)
    }
  })
}
function checkBalance(id, callBackBalance){
  if(id<=0){
    return callBackBalance(0)
  }
  var sql = "SELECT balance FROM users WHERE id='"+id+"'"
  connection.query(sql,
  function(err,results,field){
    if(!err){
      return callBackBalance(results[0].balance)
    }else{
      // console.log(err)
      return callBackBalance(0)
    }
  })
}
function cashOut(id, coin, callBackCash){
  if(id<=0 || coin <=0){
    return callBackCash(0)
  }
  var sql ="UPDATE users SET cashout='"+coin+"' WHERE id='"+id+"'"
  connection.query(sql,
    function(err, results, field){
      if(!err){
        return callBackCash(1)
      }else{
        return callBackCash(0)
      }
    })
}
function requestMoney(id, coin, callBackResquest){
  var error = { status: 0 }
  if(id <=0 || coin<=0 ){
    return callBackResquest(error)
  }
  //Kiểm tra blockMoney
  blockMoney(id, function(resultBlock){
    //Kiểm tra balance của user
    checkBalance(id, function(resultBalance){
      if(resultBlock+coin >resultBalance){
        return callBackResquest({status:0, code:'Số tiền không hợp lệ'})
      }else{
        cashOut(id, coin, function(resultCash){
          if(resultCash){
            return callBackResquest({status:1, code:'Số tiền đang đợi duyệt'})
          }else{
            return callBackResquest(error)
          }

        })
      }
    })
  })
}

requestMoney(1,1, function(resultRequest){
  console.log(resultRequest)
})
