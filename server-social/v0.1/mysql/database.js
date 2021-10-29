var mysql = require("mysql");
var md5 = require('md5');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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
  sql = "SELECT a.name, b.content, c.*"+
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
  sql = "SELECT a.name, a.avatar, a.username, a.email, a.phone, b.content, c.*"+
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
// "SELECT id_st, connecter_id,content,benefit, "+
// " DATE_FORMAT(date_st, '%d/%l/%Y %H:%i') as date_st"+
// " FROM status"+
// " WHERE id_st <= (SELECT MAX(id_st) FROM status )"+
// "ORDER BY id_st DESC"


//
