// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js

const config = {
  appid: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/getpartialrefundstatus"
};

const params = {
  appid: config.appid,
  timestamp: Date.now(), // miliseconds
  mrefundid: "211118_2554_1637244386332747",
};

const data = config.appid + "|" + params.mrefundid + "|" + params.timestamp; // appid|mrefundid|timestamp
params.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

axios.get(config.endpoint, { params })
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
