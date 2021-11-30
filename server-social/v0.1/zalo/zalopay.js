// Node v12.22.1
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs')

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  var error = {status: 0}
 exports.napTien =  async function (coin, descriptions, callBackQR){
   const config = {
     appid: "2554",
     key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
     key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
     endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
     };
   if(!descriptions || isNaN(coin)){
     callBackQR(error)
   }
   try {
     const embeddata = {
       merchantinfo: "inmoney"
     };
     const items = [{
       itemid: "",
       itemname: "Nạp tiền"
     }];
     const order = {
       appid: config.appid,
       apptransid: `${moment().format('YYMMDD')}_${getRandomInt(1000)}`, // nên dùng useRef lưu, lấy status đơn hàng
       appuser: "demo",
       apptime: Date.now(), // miliseconds
       item: JSON.stringify(items),
       embeddata: JSON.stringify(embeddata),
       amount: coin,// số tiền muốn nạp
       description: descriptions, //Mô tả
       bankcode: "zalopayapp",
     };

     const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
     axios.post(config.endpoint, null, { params: order })
       .then(res => {
         console.log(res.data);
         var response = res.data
         response.apptransid = order.apptransid
         return  callBackQR(response)
       })
       .catch(err => {throw (error)});
   } catch (err) {
     callBackQR(error)
   }
}

exports.statusQR = async function(apptransid, callBackScan){
  if(!apptransid){
    return callBackScan(error)
  }
  try{
    const config = {
        appid: "2554",
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid"
    };
    let postData = {
        appid: config.appid,
        apptransid: apptransid,
    }

    let data = postData.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
        method: 'post',
        url: config.endpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };
    axios(postConfig)
        .then(function (response) {
            return callBackScan(response.data)
        })
        .catch(function (err) {
          throw(error);
        });
  }catch(err){
    return callBackScan(error)
  }
}

exports.rutTien = async function (user_id, coin, zptransid){
  const config = {
    appid: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/partialrefund"
  };
  const timestamp = Date.now();
  const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id

  let params = {
    appid: config.appid,
    mrefundid: `${moment().format('YYMMDD')}_${config.appid}_${uid}`, //tự gen mã riêng của mình
    timestamp, // miliseconds lấy theo current time
    zptransid: zptransid, //dùng useRef, để có thể hoàn tiền
    amount: coin,
    description: 'hoàn tiền từng phần',
  };
  let data = params.appid + "|" + params.zptransid + "|" + params.amount + "|" + params.description + "|" + params.timestamp;
  params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  console.log('o day')
  const ketqua = null
  axios.post(config.endpoint, null, { params })
    .then(res => {console.log(res.data); ketqua =  res.data})
    .catch(err => {return ({status: 0}) });
  return {status: 1}

}
