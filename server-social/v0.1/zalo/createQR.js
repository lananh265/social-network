// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
// const { v4: uuidv4 } = require('uuid');
 // npm install uuid
const moment = require('moment'); // npm install moment

// APP INFO
const config = {
  appid: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
};

const embeddata = {
  merchantinfo: "inmoney"
};

const items = [{
  itemid: "",
  itemname: "Nạp tiền"
}];
//apptransid: `${moment().format('YYMMDD')}_${uuidv4()}`, // mã giao dich có định dạng yyMMdd_xxxx
//apptransid: `${moment().format('YYMMDD')}_${getRandomInt(1000)}`
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const order = {
  appid: config.appid,
  apptransid: `${moment().format('YYMMDD')}_${getRandomInt(1000)}`, // nên dùng useRef lưu, lấy status đơn hàng
  appuser: "demo",
  apptime: Date.now(), // miliseconds
  item: JSON.stringify(items),
  embeddata: JSON.stringify(embeddata),
  amount: 100000,// số tiền muốn nạp
  description: "Nạp tiền", //Mô tả
  bankcode: "zalopayapp",
};

// appid|apptransid|appuser|amount|apptime|embeddata|item
const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
// console.log(order.mac);
console.log(order.apptransid)
axios.post(config.endpoint, null, { params: order })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => console.log(err));
