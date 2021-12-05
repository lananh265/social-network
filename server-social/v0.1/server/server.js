const express = require('express');
const app = express();
var database = require("../mysql/database");
var md5 = require('md5');
const fileUpload = require('express-fileupload');
var money = require("../mysql/transfer");
var zalo = require("../zalo/zalopay")
const http = require("http"); //dung cho socket io
var cron = require('node-cron');
const axios = require('axios')
var server = http.Server(app);

var io = require("socket.io")(server,{
  cors: {
        origin: "*",
    }
}); //trong server co option
var arrayUser=[]
io.on("connection", function(socket){
  const count = io.engine.clientsCount;//đếm xem có bao nhiêu client
  socket.emit("getId", socket.id) //gửi cho tất cả client khi vừa connected
  console.log(arrayUser)
  socket.on("client-send-obSocket", function(data){
    if(arrayUser.map(function(e) {
      return e.username;
    }).indexOf(data.username)>=0){
      console.log('username da ton tai')

      socket.emit("online", arrayUser)
    }else{
      arrayUser.push(data)
      socket.username = data.username
      socket.connecter_id = data.connecter_id
      console.log("nguoi moi online: "+data.username)
      // socket.broadcast.emit("online", arrayUser)
      io.sockets.emit("online", arrayUser)
    }
  })


  socket.on("mess-out", function(data){
    console.log("co tin nhan: "+data.text_me);

    if(data.connecter_id != data.target_id){
      database.saveMess(data.connecter_id, data.target_id, data.text_me,
        function(resultQuery){ //thuc hien luu tin nhan
          if(resultQuery.status){
            // io.emit("mess-in", data);
            // gửi tin nhắn riêng cho target và mình
            index_target_id = arrayUser.map(function(e) {
                return e.connecter_id;
              }).indexOf(Number(data.target_id))
              // console.log("ket qua")
              // console.log(data.target_id)
              io.to(`${socket.id}`).emit('mess-in', data);
              if(index_target_id>=0 || !data.target_id){
                var socketID = arrayUser[index_target_id].socket_id
                // console.log(`${data.target_id}`)
                io.to(`${socketID}`).emit('mess-in', data);
              }else{
                console.log('loi target khong online')
              }
            }// inser data thanh cong
        })
      }
  })

  socket.on("disconnect", () => {
    if(socket.username){
      console.log(socket.username + " da offline");
      arrayUser.splice(
        arrayUser.map(function(e) {
          return e.username;
        }).indexOf(socket.username), 1
      )
      console.log(arrayUser)
    }
    socket.broadcast.emit("online", arrayUser)
    // console.log(arrayUser)
  });

})//xong socket io

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//doi voi su dung PostMan
app.use(bodyParser.raw());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});//khai bao header ho tro react

//default trang chu
app.get("/", (req, res) => {
  res.send("Start Server Node JS version: v0.1");
});

//random string
function random(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

//get signup
app.get("/v0.1/signup", (req, res) => {
  var error = {
    status: 0
  }
  //parse body req
  if (!req.query.username || !req.query.password || !req.query.email ||
      !req.query.phone || !req.query.name || !req.query.gender
      || isNaN(req.query.phone) || isNaN(req.query.gender)){
      res.send(error)
  }else{
    if(isNaN(req.query.phone)){
     console.log(req.query.phone + " is not a number <br/>");
    }else{
     console.log(req.query.phone + " is a number <br/>");
    }
    var username  = req.query.username;
    var password  = req.query.password;
    var email     = req.query.email;
    var phone     = req.query.phone;
    var name      = req.query.name;
    var gender    = req.query.gender;

    var salt      = random(10);
    var hashPass  = md5(password+salt);
    // res.send(username)

    database.signUp(username, hashPass, email, phone, name, salt, gender,
      function(resultQuery){
        res.json(resultQuery)
      })
  }
})

app.post("/v0.1/login", (req, res) =>{
  let error = {
    status: 0
  }
  if (!req.body.username || !req.body.password){
    console.log("loi")
      res.send(error)
  }else{
    var username = (req.body.username);
    var password = (req.body.password);

    database.logIn(username, password, function(resultQuery){
      setTimeout(function() {
        res.json(resultQuery)
      }, 500); //time out
    })
  }

})// /v0.1/login

app.post("/v0.1/postshare",(req,res)=>{
  let error = {
    status: 0
  }
  if (!req.body.connecter_id || !req.body.content || !req.body.benefit
      || isNaN(req.body.connecter_id) || isNaN(req.body.benefit) ){
      console.log("loi")
      res.send(error)
  }else{
    var connecter_id = req.body.connecter_id
    var content = req.body.content
    var benefit = req.body.benefit

    database.saveShare(connecter_id, content, benefit, function(resultQuery){
      // res.json(resultQuery)
      setTimeout(function() {
        res.json(resultQuery)
      }, 200); //time out
    })
  }
})// /v0.1/postshare

app.get("/status", (req, res) =>{
  var array = [
    {
    "id_st": 1,
    "connecter_id": 1,
    "content": "Mình cần học khóa IoT",
    "date_st": "29/09/2021",
    "benefit": 200000,
    "name": "Phạm Minh Tỷ"
    },
    {
    "id_st": 2,
    "connecter_id": 2,
    "content": "Mình cần học React JS",
    "date_st": "29/09/2021",
    "benefit": 250000,
    "name": "Hồ Thị Lan Anh"
    }
  ]
  res.send(array)
})

app.get("/send", (req, res)=>{
  let a = "2"
  let b = "1"
  let c = "chào anh"

  database.saveMess(a,b,c, function(resultQuery){
    if(resultQuery.status){
      console.log(resultQuery)
    }
    res.json(resultQuery)
  })
})

app.get("/v0.1/status", (req, res)=>{
  database.showStatus(function(resultQuery){
    setTimeout(function() {
      res.json(resultQuery)
    }, 1000); //time out
  })
})// /v0.1/status

//get signup
app.get("/v0.1/avatar", (req, res) => {
  var error = {
    status: 0
  }
  //parse body req
  if (!req.query.id ||  isNaN(req.query.id)){
      res.send(error)
  }else{
    var id = req.query.id;
    database.getAvatar(id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})
app.use(fileUpload());
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const newName = req.body.newName;
  const id = req.body.id;
  console.log(newName);
  file.mv(`${__dirname}/images/avatars/${req.body.newName}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    database.upAvatar(id,newName, function(resultQuery){
      if(resultQuery.status){
        // console.log(resultQuery)
      }
      // res.json(resultQuery)
    })
    res.json({ fileName: file.name, filePath: `/uploads/${req.body.newName}` });
  });
});

app.post('/v0.1/jointask', (req,res)=>{
  var error = {
    status: 0
  }
  //parse body req
  if (!req.body.id_st || !req.body.connecter_id || !req.body.target_id ||
      !req.body.name || !req.body.benefit || !req.body.content
      || isNaN(req.body.id_st) || isNaN(req.body.connecter_id)
      || isNaN(req.body.target_id) || isNaN(req.body.benefit)
      || req.body.connecter_id == req.body.target_id){

      res.send(error)
      if(isNaN(req.body.id_st)){
       console.log(req.body.id_st + " is not a number ");
      }

  }else{ //query
    // console.log(" jointask hop le")
    var id_st = req.body.id_st
    var connecter_id = req.body.connecter_id
    var target_id = req.body.target_id
    database.joinTask(id_st, connecter_id, target_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
 }
})

app.post('/v0.1/showtasks', (req,res)=>{
  var error = {
    status: 0
  }
  if(!req.body.target_id || isNaN(req.body.target_id) ){
    res.send(error)
  }else{
    var target_id = req.body.target_id
    database.showtasks(target_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})

app.post('/v0.1/changeinfor', (req, res)=>{
  var error = { status: 0 }
  if(!req.body.username || !req.body.password){
    return res.send(error)
  }else{
    var username = req.body.username
    var password = req.body.password
    var newname = req.body.newname
    var newemail = req.body.newemail
    var newphone = req.body.newphone
    var newpassword = req.body.newpassword
    var salt      = random(10);
    if(newpassword){newpassword = md5(newpassword+salt)}
    // console.log(newpassword)
    database.changeInfor(username, password, newname, newphone, newemail,
                         salt, newpassword, function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 1000); //time out
      })
    }
})

app.post('/v0.1/getInfor',  (req, res)=>{
  var error = { status: 0 }
  if(!req.body.id || isNaN(req.body.id) ){
    res.send(error)
  }else{
    var id = req.body.id
    database.getInfor(id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})

app.post('/v0.1/search', (req, res)=>{
  var error = { status: 0 }
  if(!req.body.key){
    res.send(error)
  }else{
    // console.log('den day')
    var key = req.body.key
    database.search(key,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})

app.post('/v0.1/listuserinbox', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.connecter_id || isNaN(req.body.connecter_id)){
    console.log(' bi cho nay')
    res.send(error)
  }else{
    var connecter_id = req.body.connecter_id
    database.listUserInbox(connecter_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})

app.post('/v0.1/getMess', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.id || isNaN(req.body.id)){
    res.send(error)
  }else{
    var id = req.body.id
    database.getMess(id, function(resultQuery){
      setTimeout(function() {
        res.json(resultQuery)
      }, 500); //time out
    })
  }
})

app.post('/v0.1/contact',(req,res)=>{
  var error = { status: 0 }
  if(!req.body.connecter_id || !req.body.target_id || !req.body.text_me
    || isNaN(req.body.connecter_id) || isNaN(req.body.target_id)){
    res.send(error)
  }else{
    var connecter_id = req.body.connecter_id
    var target_id = req.body.target_id
    var text_me = req.body.text_me
    database.saveMess(connecter_id, target_id, text_me,
      function(resultQuery){
        res.json(resultQuery)
      })
  }
})

app.post('/v0.2/showtasks', (req,res)=>{
  var error = {
    status: 0
  }
  if(!req.body.target_id || isNaN(req.body.target_id) ){
    res.send(error)
  }else{
    var target_id = req.body.target_id
    database.showtasks2(target_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})

app.post('/v0.1/getuser',(req,res)=>{
  var error = { status: 0 }
  if(!req.body.id || isNaN(req.body.id) ){
    res.send(error)
  }else{
    var id = req.body.id
    database.getUser(id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 100); //time out
      })
  }
})

app.post('/v0.1/ordertask', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.id_st || isNaN(req.body.id_st)
  || !req.body.connecter_id || isNaN(req.body.connecter_id) ){
    res.send(error)
  }else{
    var id_st = req.body.id_st
    var connecter_id = req.body.connecter_id
    database.orderTask(id_st, connecter_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 200); //time out
      })
  }
})

app.post('/v0.2/listuserinbox', (req,res)=>{
    database.listUserInbox2(
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
})

app.post('/v0.1/taskfinished', (req,res)=>{
    var error = { status: 0 }
    if(!req.body.id_ta || !req.body.id_st || isNaN(req.body.id_ta)
        || isNaN(req.body.id_st)){
      res.send(error)
    }else{
      var id_ta = req.body.id_ta
      var id_st = req.body.id_st
      database.taskFinished( id_ta, id_st,
        function(resultQuery){
          setTimeout(function() {
            res.json(resultQuery)
          }, 500); //time out
        })
      }
})

app.post("/v0.2/postshare",(req,res)=>{
  let error = {
    status: 0
  }
  if (!req.body.connecter_id || !req.body.content || !req.body.benefit
      || isNaN(req.body.connecter_id) || isNaN(req.body.benefit) ){
      console.log("loi")
      res.send(error)
  }else{
    var connecter_id = req.body.connecter_id
    var content = req.body.content
    var benefit = req.body.benefit

    database.saveShare2(connecter_id, content, benefit, function(resultQuery){
      // res.json(resultQuery)
      setTimeout(function() {
        res.json(resultQuery)
      }, 200); //time out
    })
  }
})// /v0.1/postshare

app.post("/v0.1/deletetask", (req,res)=>{
  let error = { status: 0 }
  if(!req.body.target_id || !req.body.id_st
    || isNaN(req.body.target_id) || isNaN(req.body.id_st)){
    res.send(error)
  }else{
    var target_id = req.body.target_id
    var id_st = req.body.id_st
    database.deleteTask(target_id, id_st,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})//

app.post('/v0.1/shownotes', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.connecter_id || isNaN(req.body.connecter_id) ){
    res.send(error)
  }else{
    var connecter_id = req.body.connecter_id
    database.showNotes(connecter_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})

app.post('/v0.1/deletenote', (req,res)=>{
  let error = { status: 0 }
  if(!req.body.connecter_id || !req.body.id_ta
    || isNaN(req.body.connecter_id) || isNaN(req.body.id_ta)){
    res.send(error)
  }else{
    var connecter_id = req.body.connecter_id
    var id_ta = req.body.id_ta
    database.deleteNote(connecter_id, id_ta,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
    }
})
app.post('/v0.1/transfer', (req,res)=>{
  let error = { status: 0 }
  if(!req.body.connecter_id || !req.body.target_id || !req.body.coin
    || isNaN(req.body.connecter_id) || isNaN(req.body.target_id)
    || isNaN(req.body.coin)){
      // console.log("loi ne")
      res.send(error)
    }else{
      var connecter_id = req.body.connecter_id
      var target_id = req.body.target_id
      var coin = req.body.coin
      money.transfer(connecter_id, target_id, coin,
        function(resultQuery){
          // console.log("o day")
          setTimeout(function() {
            res.json(resultQuery)
          }, 4500); //time out
        })
    }
})

app.post('/v0.3/showtasks', (req,res)=>{
  var error = {
    status: 0
  }
  if(!req.body.target_id || isNaN(req.body.target_id) ){
    res.send(error)
  }else{
    var target_id = req.body.target_id
    database.showtasks3(target_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
      })
  }
})
app.post('/v0.1/taskconfirm', (req,res)=>{
    var error = { status: 0 }
    if(!req.body.id_ta || !req.body.id_st || isNaN(req.body.id_ta)
        || isNaN(req.body.id_st)){
      res.send(error)
    }else{
      var id_ta = req.body.id_ta
      var id_st = req.body.id_st
      database.taskConfirm( id_ta, id_st,
        function(resultQuery){
          setTimeout(function() {
            res.json(resultQuery)
          }, 500); //time out
        })
      }
})

app.post('/v0.2/ordertask', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.id_st || isNaN(req.body.id_st) || isNaN(req.body.target_id)
    || !req.body.connecter_id || isNaN(req.body.connecter_id)
    || !req.body.target_id || !req.body.benefit || isNaN(req.body.benefit)){
    res.send(error)
  }else{
    var id_st = req.body.id_st
    var connecter_id = req.body.connecter_id
    var target_id = req.body.target_id
    var benefit = req.body.benefit
    database.orderTask2(id_st, connecter_id, target_id, benefit,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 200); //time out
      })
  }
})

app.post('/v0.1/accountinfor', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.user_id || isNaN(req.body.user_id)){
    res.send(error)
  }else{
    var user_id = req.body.user_id
    database.accountInfor(user_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 200); //time out
      })
  }
})

app.get('/v0.1/inmoney', (req,res)=>{
  var error = { status: 0 }
  if( req.query.user_id <= 0 ||isNaN(req.query.user_id)
      || req.query.coin<= 0 || isNaN(req.query.coin) ){
    res.send(error)
  }else{
    var user_id = parseInt(req.query.user_id)
    var coin = parseInt(req.query.coin)
    money.inMoney(user_id, coin,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 200); //time out
      })
  }
})

app.get('/v0.1/outmoney', (req,res)=>{
  var error = { status: 0 }
  if( req.query.user_id <= 0 ||isNaN(req.query.user_id)
      || req.query.coin<= 0 || isNaN(req.query.coin) ){
    res.send(error)
  }else{
    var user_id = parseInt(req.query.user_id)
    var coin = parseInt(req.query.coin)
    money.outMoney(user_id, coin,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 200); //time out
      })
  }
})

app.post('/v0.1/historymoney', (req,res)=>{
  var error = { status: 0 }
  if(!req.body.user_id || isNaN(req.body.user_id)){
    res.send(error)
  }else{
    var user_id = parseInt(req.body.user_id)
    database.historyMoney(user_id,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 200); //time out
      })
  }
})

app.post("/v0.2/login", (req, res) =>{
  let error = {
    status: 0
  }
  if (!req.body.username || !req.body.password){
    console.log("loi")
      res.send(error)
  }else{
    var username = (req.body.username);
    var password = (req.body.password);

    database.logIn2(username, password, function(resultQuery){
      setTimeout(function() {
        res.json(resultQuery)
      }, 500); //time out
    })
  }
})// /v0.2/login

app.get('/v0.1/naptien', (req,res)=>{
  var error = { status: 0 }
  if( !req.query.description || req.query.coin<= 0 || isNaN(req.query.coin) ){
    res.send(error)
  }else{
    var description = (req.query.description)
    var coin = parseInt(req.query.coin)
    zalo.napTien(coin, description, function(resultQuery){
      setTimeout(function() {
        res.json(resultQuery)
      }, 500); //time out
    })
  }
})

app.post('/v0.1/statusQR', (req,res)=>{
  var error = { status: 0 }
  if( !req.body.apptransid ){
    res.send(error)
  }else{
    var apptransid = (req.body.apptransid)
    zalo.statusQR(apptransid, function(resultQuery){
      setTimeout(function() {
        res.json(resultQuery)
      }, 500); //time out
    })
  }
})

app.post('/v0.1/updateToken', (req,res)=>{
  var error = { status: 0 }
  if( !req.body.apptransid || !req.body.zptransid ||
      !req.body.user_id || isNaN(req.body.user_id) ){
    res.send(error)
  }else{
    var user_id = parseInt(req.body.user_id)
    var apptransid = (req.body.apptransid)
    var zptransid = (req.body.zptransid)
    database.updateToken(user_id, apptransid,zptransid,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 100); //time out
    })
  }
})

app.post('/v0.1/ruttien', (req,res)=>{
  var error = { status: 0 }
  if( req.body.user_id <= 0 ||isNaN(req.body.user_id)
      || req.body.coin<= 0 || isNaN(req.body.coin)
    || isNaN(req.body.zptransid)){
    res.send(error)
  }else{
    var user_id = parseInt(req.body.user_id)
    var coin = parseInt(req.body.coin)
    var zptransid = parseInt(req.body.zptransid)
    money.rutTien(user_id, coin, zptransid,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
    })
  }
})

function cronMoMo(){
  var url = "https://tyaiti.000webhostapp.com/momolananh/db/history.php"
  axios.get(url)
    .then((result) => {
      let str = result.data
      let format = str.slice(91, 91) + str.slice(92)
      let array = JSON.parse(format)
      database.updateHistoryMoMo(array)
    })
    .catch((err) => {
      console.log('crontab bi loi: '+err)
    })
}
function updateLSGD(){
  var url = "https://tyaiti.000webhostapp.com/momolananh/db/updateHis.php"
  axios.get(url)
    .then((result) => {
      //
    })
    .catch((err) => {
      console.log('update LSGD loi: '+err)
    })
}
//5 phut run 1 lan
cron.schedule('0 */5 * * * *', () => {
   console.log('run 5 phut update lsgd mot lan');
   // updateLSGD()
   setTimeout(function() {
     cronMoMo()
     // console.log('cron momo')
   }, 1000); //sau 4 giay se cap nhat data historymomo
   setTimeout(function() {
     database.showHistoryMoMo(function(resultQuery){
       console.log(resultQuery)
        resultQuery.forEach(e=>{
        database.addBalance(e)
        })
     })
   }, 8000); //sau 2 giay se cap nhat data historymomo
 }, {
   scheduled: true,
   timezone: "Asia/Ho_Chi_Minh"
 });

app.get('/v0.1/lsgdmomo', (req, res)=>{
  database.showHistoryMoMo(function(resultQuery){
    setTimeout(function() {
      // console.log(resultQuery)
      res.json(resultQuery)
    }, 1000);
  })
})

app.post('/v0.1/outmoney', (req,res)=>{
  var error = { status: 0 }
  if( req.body.user_id <= 0 ||isNaN(req.body.user_id)
      || req.body.coin<= 0 || isNaN(req.body.coin)){
    res.send(error)
  }else{
    var user_id = parseInt(req.body.user_id)
    var coin = parseInt(req.body.coin)
    database.requestMoney(user_id, coin,
      function(resultQuery){
        setTimeout(function() {
          res.json(resultQuery)
        }, 500); //time out
    })
  }
})
const fs = require("fs");
fs.readFile(__dirname + "/buddha.txt", (error, data) => {
    if(error) {
        throw error;
    }
    // console.log(data.toString());
});
server.listen(4000, () => console.log('API is running on http://localhost:4000'));
