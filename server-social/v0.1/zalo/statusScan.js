// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs')

const config = {
    appid: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid"
};

let postData = {
    appid: config.appid,
    apptransid: "211120_961", // Input your apptransid
}

let data = postData.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
// console.log(postData.mac)

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
        console.log((response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
