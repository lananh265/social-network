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

function historyMoney(user_id){
  var error = { status: 0 }
 if(!user_id || isNaN(user_id)){
   return (error)
 }
 hisConn(user_id, function(resultCon){
   if(resultCon.status === 0){
     return (error)
   }else{
     hisTar(user_id, function(resultTar){
       if(resultCon.status === 0){
         return (error)
       }else{
         resultTar.map((e)=>{
           resultCon.push(e)
         })
         resultCon.sort(function (a, b) {
           return a.value - b.value;
         });
         var result = resultCon.reverse()
         console.log(result)
         return (resultTar)
       }
     })//tar
   }
 })//con
}
historyMoney(2)
