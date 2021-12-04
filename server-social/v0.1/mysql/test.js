var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_db"
})
connection.connect(function(err){
  if(!err){console.log("Database is connected !!")
  }else{console.log("Database connect fail !!")}
})
function addRow (callbackQuery){
  connection.query("INSERT INTO `my_table` (`id`) VALUES (1)",
  function(err, results, fields){
    if(!err){callbackQuery(results)
    }else{callbackQuery(err)}
  })
}
addRow( function(result){
  console.log(result)
})
