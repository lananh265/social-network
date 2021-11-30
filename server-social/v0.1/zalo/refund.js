// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment

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
  zptransid: '211119000002962', //dùng useRef, để có thể hoàn tiền
  amount: '1000',
  description: 'hoàn tiền từng phần',
};
console.log("mrefundid: " +params.mrefundid)
// appid|zptransid|amount|description|timestamp
let data = params.appid + "|" + params.zptransid + "|" + params.amount + "|" + params.description + "|" + params.timestamp;
params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

axios.post(config.endpoint, null, { params })
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
