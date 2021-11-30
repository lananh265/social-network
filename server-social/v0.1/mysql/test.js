const CryptoJS = require('crypto-js');

const appid= "1"
const apptransid="160405095135-57032837085b5"
const appuser="pmqc"
const apptime=1459823610957
const description="Mua kim nguyên bảo cho game VLTK"
const embeddata={"promotioninfo":"{\"campaigncode\":\"yeah\"}","merchantinfo":"embeddata123"}
const item=[{"itemid":"knb","itemname":"kim nguyen bao","itemquantity":10,"itemprice":50000}]
const amount=500000
// const mac='28ecee91f4b32aa1306812f5d74c4ed1f7cbce7b4f2848cf06f23933ae8027e0'


const key1 = "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q"
const data = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item;

const mac = CryptoJS.HmacSHA256(data, key1).toString();
console.log(mac)
