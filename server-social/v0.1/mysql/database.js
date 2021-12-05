var mysql = require("mysql");
var md5 = require('md5');
var connection = mysql.createConnection({
  host: "localhost",
  user: "lananh",
  password: "123456",
  database: "httt"
})

var duplicate = ["username", "email", "phone"];

// var connect = function(){
  connection.connect(function(err){
    if(!err){
      console.log("Database is connected !!")
    }else{
      console.log("Database connect fail !!")
    }
  })
// }

var closeDB = function(){
  connection.end(function(err){
    if(!err){
      console.log("close db")
    }
  })
}

exports.getAllUser = function(callbackQuery){
  // connect();
  connection.query("select * from messages", function(err, results, fields){
    if(!err){
      callbackQuery(results)
    }else{
      console.log(err)
    }
  })
}

//example
exports.insertData = function(message,callbackInsert){
  // connect();
  connection.query("INSERT INTO messages (id, message)" +
    "VALUES (NULL, '"+message+"');",
    function(err, results, fileds){
    if(!err){
      callbackInsert(results)
    }else{
      console.log(err)
    }
  })
}

exports.signUp = function(username, hashPass, email, phone, name,
  salt, gender, callbackSignup){
    connection.query("INSERT INTO users ( username, password, salt,"+
    " email, phone, name, gender, avatar)" +
    "VALUES ( '"+username+"', '"+hashPass+"',"+" '"+salt+"', "+
    "'"+email+"', '"+phone+"', '"+name+"', '"+gender+"', 'user.png');",
      function(err, results, fileds){
      if(!err){
        var status = {
          status: 1,
          code: results.insertId
        }
        callbackSignup(status)
      }else{
        let string_err = err.sqlMessage;
        let status = 0;
          for(let i=0; i<=duplicate.length; i++){
            if( string_err.indexOf(duplicate[i])>0 ){
                 status = {
                  status: 0,
                  code: duplicate[i]
                  }
                }
          }
          console.log(string_err)
          callbackSignup(status)
      }//else
    })
  }

exports.logIn = function(username, password, callbackLogin){
  //find salt
  var error = {
    status: 0
  }
  connection.query("select salt from users where username='"
                      +username+"'",
    function(err, results, fields){
      if(!err){//query salt success
        if(results.length > 0){
          var salt = results[0].salt
          var hashPass = md5(password+salt)

        //check login
        connection.query("select id, username, email, phone, name, avatar from users where username='"
                          +username+"' and password='"+hashPass+"'",
              function(err2, results2, fields2){
              if(!err2){//query login success
                  if(results2.length > 0){
                    results2[0].status = 1
                    callbackLogin(results2[0])
                    //console.log(results2)
                  }else{
                    callbackLogin({status:0})
                  }
              }else {//query login failed
                // callbackLogin("null")
                callbackLogin(error)
                }
            })

        //callbackLogin(results)
      }else { //no salt
        // callbackLogin("null")
        callbackLogin(error)
        }
    }else{//query salt failed
      // callbackLogin("null")
      callbackLogin(error)
    }
    })
}

exports.saveMess = function( connecter_id, target_id, text_me, callbackMess){
  let error = {
    status: 0
  }
  connection.query("INSERT INTO messages (id_me, connecter_id, target_id, text_me, date_me)"+
    " VALUES (NULL, '"+connecter_id+"', '"+target_id+"', '"+text_me+"', NULL)",
    function(err, results, fields){
      if(!err){//query login success
          if(results.insertId > 0){
            callbackMess({status: 1})
            //console.log(results2)
          }else{
            console.log(results)
            console.log("cho nay")
            callbackMess(error)
          }
      }else {//query login failed
        // console.log("tai day")
        callbackMess(error)
        }
    }
  )

}

exports.saveShare = function(connecter_id, content, benefit, callbackShare){
  let error = {
    status: 0
  }
  connection.query("INSERT INTO status (id_st, connecter_id, content, date_st, benefit)"+
    " VALUES (NULL, '"+connecter_id+"', '"+content+"', NULL, '"+benefit+"')",
    function(err, results, fields){
      if(!err){//query login success
          if(results.insertId > 0){
            // console.log(results)
            callbackShare({status: 1, id_st: results.insertId})
            //console.log(results2)
          }else{
            console.log(results)
            console.log("cho nay")
            callbackShare(error)
          }
      }else {//query login failed
        console.log("tai day")
        callbackShare(error)
        }
    }
  )
}

exports.showStatus = function( callbackStatus){
  let error = {
    status: 0
  }
  var sql = "SELECT b.id_st,"+
  "       b.connecter_id,a.name, b.content,b.benefit,"+
        " DATE_FORMAT(b.date_st, '%d/%l/%Y %H:%i') as date_st"+
  " FROM users as a, status as b"+
  " WHERE a.id=b.connecter_id"+
  " ORDER BY b.id_st DESC;"
  connection.query( sql,
    function(err, results, fileds){
    if(!err){
      callbackStatus(results)
    }else{
      console.log(err)
    }
  })
}

exports.upAvatar = function(id,url, callBackAvatar){
  let error = {
    status: 0
  }
  var sql = "UPDATE `users` SET `avatar` = '"+url+"' WHERE `users`.`id` = '"+id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        callBackAvatar({status: 1})
      }else{
        callBackAvatar(error)
      }
    }

  )
}

exports.getAvatar = function(id, callBackAvatar){
  let error = {
    status: 0
  }
  var sql = "SELECT avatar FROM `users` WHERE id='"+id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        callBackAvatar(results)
      }else{
        callBackAvatar(error)
      }
    }
  )
}

exports.joinTask = function(id_st, connecter_id, target_id, callBackJoin){
  let error = { status: 0 }
  if(connecter_id == target_id){
    return callBackJoin(error)
  }
  var sql ="INSERT INTO tasks ( id_st, connecter_id, target_id)"+
          "VALUES( '"+id_st+"','"+connecter_id+"','"+target_id+"')";
  connection.query(sql,
  function(err, results, fields){
    if(!err){
      return callBackJoin({status:1, insertId: results.insertId})
    }else{
      return callBackJoin(error)
    }
  })
}

exports.showtasks = function(target_id, callBackTask){
  let error = { status: 0 }
  sql = "SELECT a.name, b.content, c.*", +
  " FROM users as a, status as b, tasks as c"+
  " WHERE c.target_id='"+target_id+"' AND c.connecter_id=a.id"+
  " AND c.id_st =b.id_st"+
  " ORDER BY b.id_st DESC;"
  // var sql2 = "SELECT * FROM tasks WHERE target_id='"+target_id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        callBackTask(results)
      }else{
        console.log(err.sql)
        callBackTask(error)
      }
    })
}

 function changeName(id, newname, callBackName){
   let error = { status: 0 }
   if(!id || !newname){
     return callBackName(error)
   }
   var sql = "UPDATE users SET name = '"+newname+"' "+
             "WHERE users.id = '"+id+"';"
   connection.query(sql,
     function(err, results, fields){
       if(!err){
         return callBackName(results)
       }else{
         return callBackName(error)
       }
     })
   }
 function changeEmail(id, newemail, callBackEmail){
   let error = { status: 0 }
   if(!id || !newemail){
     return callBackEmail(error)
   }
   var sql = "UPDATE users SET email = '"+newemail+"' "+
             "WHERE users.id = '"+id+"';"
   connection.query(sql,
     function(err, results, fields){
       if(!err){
         return callBackEmail(results)
       }else{
         return callBackEmail(error)
       }
     })
 }
 function changePhone(id, newphone, callBackPhone){
   let error = { status: 0 }
   if(!id || !newphone){
     return callBackPhone(error)
   }
   var sql = "UPDATE users SET phone = '"+newphone+"' "+
             " WHERE users.id = '"+id+"';"
   connection.query(sql,
     function(err, results, fields){
       if(!err){
         return callBackPhone(results)
       }else{
         return callBackPhone(error)
       }
     })
 }
 function changePassword(id, salt, newpassword, callBackPassword){
   let error = { status: 0 }
   if(!id || !newpassword){
     return callBackPassword(error)
   }
   var sql = "UPDATE users "+
             " SET salt = '"+salt+"', password='"+newpassword+"' "+
             "WHERE id = '"+id+"';"
   connection.query(sql,
     function(err, results, fields){
       if(!err){
         return callBackPassword(results)
       }else{
         return callBackPassword(error)
       }
     })
 }
exports.getInfor = function(id, callBackInfor){
   let error = { status: 0 }
   if(!id){
     return callBackInfor(error)
   }
   var sql = "SELECT id, username, email, phone, name, avatar FROM users WHERE id= '"+id+"';"
   connection.query(sql,
     function(err, results, fields){
       if(!err){
         return callBackInfor(results)
       }else{
         return callBackInfor(error)
       }
     })
 }

exports.changeInfor = function(username, password, newname, newphone,
                               newemail, salt, newpassword, callBackChange){
    let error = { status: 0 }
    if(!username || !password){
      return callBackChange(error)
    }
    exports.logIn(username, password, function(resultQuery){
      if(!resultQuery.status){
          return callBackChange(error)
      }else{//resultQuery.status == 1 thuc hien
        changeName(resultQuery.id, newname, function(resultName){
          // console.log('xong name')
        })
        changeEmail(resultQuery.id, newemail, function(resultEmail){
          // console.log('xong email')
        })
        changePhone(resultQuery.id, newphone, function(resultPhone){
          // console.log('xong phone')
        })
        changePassword(resultQuery.id, salt, newpassword, function(resultPassword){
          // console.log('xong password')
        })
        exports.getInfor(resultQuery.id, function(resultInfor){
          // console.log('check thong tin ')
          return callBackChange(resultInfor)
        })

      }

    })

}

  function searchBenefit(key, callBackBenefit){
    let error = { status: 0 }

    if(!key){
      console.log('benefit')
      return callBackBenefit(error)
    }
    var sql ="SELECT * FROM status WHERE benefit='"+key+"'";
    connection.query(sql,
      function(err, results, fields){
        if(!err){
          return callBackBenefit(results)
        }else{
          return callBackBenefit(error)
        }
      })
  }
  function searchContent(key, callBackContent){
    let error = { status: 0 }
    if(!key){
      return callBackContent(error)
    }
    // console.log(key)
    var sql ="SELECT * FROM status WHERE content LIKE '%"+key+"%';"
    connection.query(sql,
      function(err, results, fields){
        if(!err){
          return callBackContent(results)
        }else{
          return callBackContent(error)
        }
      })
  }
exports.search = function(key, callBackSearch){
  let error = { status: 0 }
  if(!key){
    return callBackSearch(error)
  }
  if(!isNaN(key)){
    // console.log('den day')
    searchBenefit(key, function(resultBenefit){
      callBackSearch(resultBenefit)
    })
  }else{
    searchContent(key, function(resultContent){
      callBackSearch(resultContent)
    })
  }
}

// function listInbox(connecter_id, callBackInbox){
//   let error = { status: 0 }
//   if( !connecter_id || isNaN(connecter_id)){
//     return callBackInbox(error)
//   }
//   var sql = "SELECT DISTINCT target_id as id FROM messages WHERE connecter_id='"+connecter_id+"'";
//   connection.query(sql,
//     function(err, results, fields){
//       if(!err){
//         callBackInbox(results)
//       }else{
//         callBackInbox(error)
//       }
//     })
//  }
function listInbox(connecter_id, callBackInbox){
  let error = { status: 0 }
  if( !connecter_id || isNaN(connecter_id)){
    callBackInbox(error)
  }
  let arrInbox = []
  var sql = "SELECT DISTINCT target_id as id FROM messages WHERE connecter_id='"+connecter_id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        results.map( (e)=> arrInbox.push(e))
        // console.log(arrInbox)
      }else{
        callBackInbox(error)
      }
    })

    var sql2 = "SELECT DISTINCT connecter_id as id FROM messages WHERE target_id='"+connecter_id+"'";
    connection.query(sql2,
      function(err2, results2, fields2){
        if(!err2){
          results2.map( (e)=> arrInbox.push(e))
          // console.log(arrInbox)
          //loai bo trung lap
          var resultID = arrInbox.filter(function(e) {
            var key = Object.keys(e).map(k => e[k]).join('|');
            if (!this[key]) {
              this[key] = true;
              return true;
            }
          }, {});
          callBackInbox(resultID)
          // console.log(resultID)
        }else{
          // console.log(error2)
          callBackInbox(error)
        }
      })
   }
var response = [{
                  "id": 1,
                  "username": "ty",
                  "email": "tuhoangty@gmail.com",
                  "phone": "0788839863",
                  "name": "Phạm Minh Tỷ",
                  "avatar": "1avatar.jpg"
                }]
exports.listUserInbox = function(connecter_id, callBackUserInbox){
  let error = { status: 0 }
  if( !connecter_id || isNaN(connecter_id)){
    return callBackUserInbox(error)
  }
  listInbox(connecter_id, function(resultContent){
    let arrUserInbox = []
    resultContent.map( (e)=> {
      exports.getInfor(e.id, function(resultInfor){
        arrUserInbox.push(resultInfor[0])
          }
        )
      })
    return callBackUserInbox(arrUserInbox)
  })
}

exports.getMess = function(id, callBackgetMess){
  let error = [{ status: 0 }]
  if( !id || isNaN(id)){
    callBackgetMess(error)
  }else{
    var sql = "SELECT id_me, connecter_id, target_id, text_me"+
              " FROM messages "+
              " WHERE connecter_id='"+id+"'" +
              " OR target_id = '"+id+"'";
    connection.query(sql,
      function(err, results, filed){
        if(!err){
          callBackgetMess(results)
        }else{
          callBackgetMess(err)
        }
      })
  }
}

exports.showtasks2 = function(target_id, callBackTask){
  let error = { status: 0 }
  sql = "SELECT a.name, a.avatar, a.username, a.email, a.phone, b.content, c.*,"+
  " DATE_FORMAT(c.date_start, '%d/%m/%Y %H:%i') as start "+
  " FROM users as a, status as b, tasks as c"+
  " WHERE c.target_id='"+target_id+"' AND c.connecter_id=a.id"+
  " AND c.id_st =b.id_st"+
  " ORDER BY b.id_st DESC;"
  // var sql2 = "SELECT * FROM tasks WHERE target_id='"+target_id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        callBackTask(results)
      }else{
        console.log(err.sql)
        callBackTask(error)
      }
    })
}

exports.getUser = function(id, callBackUser){
  let error = { status: 0 }
  if(!id || isNaN(id) ){
    return callBackUser(error)
  }
  let sql = "SELECT id, username, email, phone, name, avatar "+
            " FROM users WHERE id='"+id+"'";
  connection.query(sql,
  function(err, results, filed){
    if(!err){
      return callBackUser(results)
    }else{
      return callBackUser(error)
    }
  })
}

function getTime(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  // console.log(time)
  // new Date().toISOString().slice(0, 19).replace('T', ' ');
  return time
}
function startDate(id_st, connecter_id, callBackStart){
  let error = { status: 0 }
  if( !id_st || !connecter_id || isNaN(id_st) || isNaN(connecter_id)){
    // console.log(error)
    return callBackStart(error)
  }else{
    var time = getTime()
    var sql = "UPDATE tasks SET date_start = '"+time+"' "+
              " WHERE connecter_id = '"+connecter_id+"' "+
              " AND id_st= '"+id_st+"' ";
    connection.query(sql,
      function(err, results, fields){
        if(!err){
          return callBackStart(results)
        }else{
          return callBackStart(error)
        }
      })
  }
}
function removeTask(id_st, callBackRemove){
  let error = { status: 0 }
  if( !id_st || isNaN(id_st) ){
    console.lo('o day')
    return callBackRemove(error)
  }else{
    var sql = "DELETE FROM tasks WHERE id_st='"+id_st+"' "+
              "AND date_start IS NULL;"
    connection.query(sql,
    function(err, results, fields) {
      if(!err){
        return callBackRemove({status:1})
      }else{
        return callBackRemove(error)
      }
    })
  }
}

exports.orderTask = function(id_st, connecter_id, callBackOrder){
  let error = { status: 0 }

  if( !id_st || isNaN(id_st) || !connecter_id || isNaN(connecter_id)){
    return callBackOrder(error)
  }
  startDate(id_st, connecter_id, function(resultStart){
    // console.log(resultStart)
    removeTask(id_st, function(resultRemove){

      return callBackOrder(resultRemove)
      // return callBackOrder(error)
    })
  })
}

exports.listUserInbox2 = function(callBackUserInbox){
  let error = { status: 0 }
  sql = "SELECT id, username, email, phone, name, avatar FROM users";
  connection.query(sql,
    function(err,results, filed){
      if(!err){
        callBackUserInbox(results)
      }else{
        callBackUserInbox(error)
      }
    })
}

exports.taskFinished = function(id_ta, id_st, callBackFinish){
  let error = { status: 0 }
  if(!id_ta || !id_st || isNaN(id_st) || isNaN(id_ta)){
    return callBackFinish(error)
  }
  //UPDATE `tasks` SET `confirm_st` = '1' WHERE `tasks`.`id_ta` = 21;
// console.log(id_ta+" "+id_st)
  var sql = "UPDATE tasks SET status_ta = '1' "+
            " WHERE id_ta = '"+id_ta+"' " +
            " AND id_st = '"+id_st+"' ";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        // console.log(results)
        callBackFinish({status: 1})
      }else{
        callBackFinish(error)
      }
    })
}

exports.saveShare2 = function(connecter_id, content, benefit, callbackShare){
  let error = { status: 0 }
  if(!connecter_id || !content || !benefit || isNaN(benefit)
    || isNaN(connecter_id)){
      return callbackShare(error)
    }
  sql = "SELECT balance FROM users WHERE id='"+connecter_id+"' ";
  connection.query(sql,
    function(err, results, filed){
      if(!err){
        if(benefit > results[0].balance ){
          return callbackShare({status:0, balance: 1})
        }else{
          exports.saveShare(connecter_id, content, benefit,
            function(resultShare){
            return callbackShare(resultShare)
          })
        }
      }else{
        return callbackShare(error)
      }
    })
}

function showJoinStatus(id_st, callBackJoinStatus){
  let error = { status: 0 }
  if(!id_st || isNaN(id_st)){
    return callBackJoinStatus(error)
  }
  var sql = "SELECT id_ta FROM tasks WHERE id_st='"+id_st+"'";
  connection.query(sql,
    function(err,results, field){
     if(!err){
       callBackJoinStatus(results)
     }else{
       return callBackJoinStatus(error)
     }
    })
}
function removeId_ta(id_ta, callBackRemove){
  let error = { status: 0 }
  if(!id_ta || isNaN(id_ta)){
    return callBackRemove(error)
  }
  var sql = "DELETE FROM tasks WHERE id_ta='"+id_ta+"' ";
  connection.query(sql,
    function(err,results, field){
     if(!err){
       callBackRemove(results)
     }else{
       return callBackRemove(error)
     }
    })
}
function deleteStatus(id_st, callBackDelete){
  let error = { status: 0 }
  if(!id_st || isNaN(id_st)){
    return callBackDelete(error)
  }
  var sql = "DELETE FROM status WHERE id_st='"+id_st+"' ";
  connection.query(sql,
    function(err,results, field){
     if(!err){
       callBackDelete({status:1})
     }else{
       return callBackDelete(error)
     }
    })
}
exports.deleteTask = function(target_id,id_st, callBackDelete){
  let error = { status: 0 }
  if(!target_id || !id_st
    || isNaN(target_id) || isNaN(id_st)){

    return callBackDelete(error)
  }
  showJoinStatus(id_st, function(resultShow){
    if(!resultShow.status && resultShow.status===0){

      return callBackDelete(error)
    }else{
      // return callBackDelete('thuc hien tiep theo')
      resultShow.map((e)=>{
        // console.log(e.id_ta)
        removeId_ta(e.id_ta, function(resultRemove){
        })})
      deleteStatus(id_st, function(resultDelete){
        return callBackDelete(resultDelete)
      })
    }

  })
  //liet ke id_ta theo id_st

}

exports.showNotes = function(connecter_id, callBackTask){
  let error = { status: 0 }
  sql = "SELECT a.name, a.avatar, a.username, a.email, a.phone, b.content, c.*,"+
  " DATE_FORMAT(c.date_start, '%d/%m/%Y %H:%i') as start "+
  " FROM users as a, status as b, tasks as c"+
  " WHERE c.target_id=a.id AND c.connecter_id='"+connecter_id+"'"+
  " AND c.id_st =b.id_st"+
  " ORDER BY b.id_st DESC;"
  // var sql2 = "SELECT * FROM tasks WHERE target_id='"+target_id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        callBackTask(results)
      }else{
        console.log(err.sql)
        callBackTask(error)
      }
    })
}

exports.deleteNote = function(connecter_id,id_ta, callBackDelete){
  let error = { status: 0 }
  if(!connecter_id || !id_ta
    || isNaN(connecter_id) || isNaN(id_ta)){
    return callBackDelete(error)
  }
  var sql = "DELETE FROM tasks WHERE id_ta='"+id_ta+"' "+
            "AND connecter_id='"+connecter_id+"' ";
  connection.query(sql,
    function(err,results, field){
     if(!err){
       callBackDelete({ status: 1 })
     }else{
       return callBackDelete(error)
     }
    })

}

exports.showtasks3 = function(target_id, callBackTask){
  let error = { status: 0 }
  sql = "SELECT a.name, a.avatar, a.username, a.email, a.phone, b.content, b.benefit, c.*,"+
  " DATE_FORMAT(c.date_start, '%d/%m/%Y %H:%i') as start "+
  " FROM users as a, status as b, tasks as c"+
  " WHERE c.target_id='"+target_id+"' AND c.connecter_id=a.id"+
  " AND c.id_st =b.id_st"+
  " ORDER BY b.id_st DESC;"
  // var sql2 = "SELECT * FROM tasks WHERE target_id='"+target_id+"'";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        callBackTask(results)
      }else{
        console.log(err.sql)
        callBackTask(error)
      }
    })
}

exports.taskConfirm = function(id_ta, id_st, callBackFinish){
  let error = { status: 0 }
  if(!id_ta || !id_st || isNaN(id_st) || isNaN(id_ta)){
    return callBackFinish(error)
  }
  //UPDATE `tasks` SET `confirm_st` = '1' WHERE `tasks`.`id_ta` = 21;
// console.log(id_ta+" "+id_st)
  var sql = "UPDATE tasks SET confirm_st = '1' "+
            " WHERE id_ta = '"+id_ta+"' " +
            " AND id_st = '"+id_st+"' ";
  connection.query(sql,
    function(err, results, fields){
      if(!err){
        // console.log(results)
        callBackFinish({status: 1})
      }else{
        callBackFinish(error)
      }
    })
}


function CheckLockMoney(target_id, benefit, calBackLock){
  let errsql = {status: 0}
  if(!target_id || !benefit || isNaN(target_id) || isNaN(benefit)){
    return calBackLock(errsql)
  }

  var sql = " SELECT SUM(b.benefit) as lockmoney"+
            " FROM tasks as a, status as b "+
            " WHERE a.date_start IS NOT NULL AND "+
            " a.target_id='"+target_id+"'"+
            " AND (a.status_ta='0'   OR a.confirm_st='0')"+
            " AND a.id_st = b.id_st"
  var sql_money = "SELECT balance From users WHERE id='"+target_id+"'"
  connection.query(sql,
    function(err, results, filed){
      var lockmoney = 0
      if(results[0].lockmoney>0){
        lockmoney = results[0].lockmoney
      }

      // console.log(lockmoney)
      if(!err){
        // var lockmoney = results[0].lockmoney
        // console.log(results[0])
        connection.query(sql_money,
          function(err2, results2,filed2){
            if(!err2){
              // console.log(results2)
              var balance = results2[0].balance
              // console.log(results2[0])
              if(balance - lockmoney >= benefit){
                // console.log("du tien")
                return calBackLock({status: 1})
              }else{
                // console.log("khong du tien "+benefit)
                return calBackLock({status: 0, code: "Bạn cần nạp thêm tiền"})
              }
            }else{
              console.log(err)
              return calBackLock(errsql)
            }
          })
      }else{
        // console.log(errsql)
        console.log("check")
        return calBackLock(errsql)
      }
    })
}
exports.orderTask2 = function(id_st, connecter_id, target_id, benefit,
  callBackOrder){
  let error = { status: 0 }

  if( !id_st || isNaN(id_st) || !connecter_id || isNaN(connecter_id)
      || !target_id || isNaN(target_id) || !benefit || isNaN(benefit)){
    return callBackOrder(error)
  }

  CheckLockMoney(target_id, benefit, function(resultLock){

    if(resultLock.status){ //check khoa money ok

      startDate(id_st, connecter_id, function(resultStart){
        // console.log(resultStart)
        // console.log("startDate")
        removeTask(id_st, function(resultRemove){
          console.log(resultRemove)
          return callBackOrder(resultRemove)
          // return callBackOrder(error)
        })
      })
    }else{ //khong du tien
      callBackOrder(resultLock)
    }
    // return callBackOrder(error)
  })
}

exports.accountInfor = function(user_id, callBackAccount){
   var error = { status: 0 }
  if(!user_id || isNaN(user_id)){
    return callBackAccount(error)
  }
  var sql = "SELECT email, phone, name, balance "+
            "FROM users WHERE id = '"+user_id+"'"
  connection.query(sql, function(err,results,filed){
    if(!err){
      return callBackAccount(results)
    }else{
      return callBackAccount(error)
    }
  })
}

// exports.historyMoney = function(user_id, callBackHistory){
//   var error = { status: 0 }
//  if(!user_id || isNaN(user_id)){
//    return callBackHistory(error)
//  }
//  var sql = "SELECT a.*, b.name "+
//            "FROM transactions as a, users as b "+
//            " WHERE a.connecter_id = '"+user_id+"' " +
//            " AND b.id = a.target_id"
//
//  connection.query(sql, function(err,results,filed){
//    if(!err){
//      return callBackHistory(results)
//    }else{
//      return callBackHistory(error)
//    }
//  })
// }


function hisConn(user_id, calBackConn){
  var error = { status: 0 }
 if(!user_id || isNaN(user_id)){
   return calBackConn(error)
 }
 var sql = "SELECT a.*, b.name "+
           "FROM transactions as a, users as b "+
           " WHERE a.connecter_id = '"+user_id+"' " +
           " AND b.id = a.target_id"
 connection.query(sql, function(err,results,filed){
   if(!err){
     return calBackConn(results)
     // return calBackConn(error)
   }else{
     return calBackConn(error)
   }
 })
}
function hisTar(user_id, calBackTar){
  var error = { status: 0 }
 if(!user_id || isNaN(user_id)){
   return calBackTar(error)
 }
 var sql = "SELECT a.*, b.name "+
           "FROM transactions as a, users as b "+
           " WHERE a.target_id = '"+user_id+"' " +
           " AND b.id = a.connecter_id"
 connection.query(sql, function(err,results,filed){
   if(!err){
     // console.log(results)
     return calBackTar(results)
   }else{
     return calBackTar(error)
   }
 })
}

exports.historyMoney = function(user_id, callBackHistory){
  var error = { status: 0 }
 if(!user_id || isNaN(user_id)){
   return callBackHistory(error)
 }
 hisConn(user_id, function(resultCon){
   if(resultCon.status === 0){
     return callBackHistory(error)
   }else{
     hisTar(user_id, function(resultTar){
       if(resultCon.status === 0){
         return callBackHistory(error)
       }else{
         resultTar.map((e)=>{
           resultCon.push(e)
         })
         resultCon.sort(function (a, b) {
           return a.value - b.value;
         });
         var result = resultCon.reverse()
         // console.log('oday')
         return callBackHistory(result)
       }
     })//tar
   }
 })//con
}

exports.logIn2 = function(username, password, callbackLogin){
  //find salt
  var error = {
    status: 0
  }
  connection.query("select salt from users where username='"
                      +username+"'",
    function(err, results, fields){
      if(!err){//query salt success
        if(results.length > 0){
          var salt = results[0].salt
          var hashPass = md5(password+salt)

        //check login
        connection.query("select id, username, email, phone, name, avatar, apptransid, zptransid "+
                         " from users where username='"
                          +username+"' and password='"+hashPass+"'",
              function(err2, results2, fields2){
              if(!err2){//query login success
                  if(results2.length > 0){
                    results2[0].status = 1
                    callbackLogin(results2[0])
                    //console.log(results2)
                  }else{
                    callbackLogin({status:0})
                  }
              }else {//query login failed
                // callbackLogin("null")
                callbackLogin(error)
                }
            })

        //callbackLogin(results)
      }else { //no salt
        // callbackLogin("null")
        callbackLogin(error)
        }
    }else{//query salt failed
      // callbackLogin("null")
      callbackLogin(error)
    }
    })
}

exports.updateToken = function(user_id, apptransid, zptransid, calBackToken){
  var error = { status: 0 }
  if( !apptransid || !zptransid ||
      !user_id || isNaN(user_id)){
    return calBackToken(error)
  }
  var sql = "UPDATE users SET apptransid= '"+apptransid+"', "+
            " zptransid='"+zptransid+"' "+
            " WHERE id='"+user_id+"' "
  connection.query(sql,
    function(err,results,field){
      if(!err){
        return calBackToken({status: 1})
      }else{
        return calBackToken(error)
      }
    })
}

exports.test = function(user_id, coin,zptransid, calBackMoney){
  calBackMoney({status: 'lan 1'})
    setTimeout(function() {
      calBackMoney({status: 'lan 2'})
    }, 500); //time out
}

exports.updateHistoryMoMo = function(data){
  if(data){
    data.forEach( e=>{
      var time = getTime()
      var sql = "INSERT INTO historymomo (phone, name, amount, comment,"+
      "io, lastupdate,ownername, ownerphone, ownercomment, serverupdate) VALUES "+
      " ('"+e.phone+"','"+e.name+"','"+e.amount+"','"+e.comment+"','"+e.io+"',"+
      " '"+e.lastupdate+"','"+e.ownername+"','"+e.ownerphone+"',"+
      " '"+e.ownercomment+"', '"+time+"')"
      connection.query(sql, function(err, results, field){
        if(!err){

        }else{
          // console.log('update loi')
          // console.log(err.sqlMessage)
        }
      })
    })
  }
}

exports.showHistoryMoMo = function(callBackMoMo){
  var sql = "SELECT *, DATE_FORMAT(lastupdate, '%Y-%m-%d %H:%i:%s') as lastupdate2"+
            ", DATE_FORMAT(serverupdate, '%Y-%m-%d %H:%i:%s') as serverupdate2" +
            " FROM historymomo"
  connection.query(sql, function(err, results, field){
    if(!err){
      callBackMoMo(results)
    }else{
      console.log('get LSGD loi')
      callBackMoMo('get LSGD loi')
    }
  })
}


function checkExistPhone(phone, callBackPhone){
  if(phone == "01214964817"){
    return callBackPhone(false)
  }
  sql = "SELECT * FROM users WHERE phone='"+phone+"' "
  connection.query(sql,
    function(err, result, field){
    if(!err){
      // console.log(result)
      if(result[0]){
        return callBackPhone(result[0].id)
      }else{
        return callBackPhone(false)
      }
    }else{
      return callBackPhone(false)
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
function finishedUpdateBalance(lastupdate, phone, callBackUpdate){
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
exports.addBalance = function (ob){
  if(ob.io==1 && !ob.upbalance){
    checkExistPhone(ob.phone, function(resultPhone){
      if(resultPhone){
        updateBalance(ob.phone, ob.amount, function(resultBalance){
          if(resultBalance){
            transactions(resultPhone, ob.amount, function(resultTransaction){
              if(resultTransaction){
                finishedUpdateBalance(ob.lastupdate2,ob.phone, function(resultFinished){
                  // console.log(resultFinished)
                })
              }
            })
          }
        })
      }
    })
  }
}
//
