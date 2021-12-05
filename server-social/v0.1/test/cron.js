var cron = require('node-cron');
const axios = require('axios')
var database = require("../mysql/database");
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
//
// cron.schedule('*/20 * * * * *', () => {
//   console.log('run cronjob')
//   cronMoMo()
// });

function getTime(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  // console.log(time)
  return time
}
console.log(getTime())
