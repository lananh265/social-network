const axios = require('axios')
/* ... */
//Anh 01214964817
//Qyen 01682259406
const params = new URLSearchParams()
params.append('chuyenkhoan', 'chuyen tien')
params.append('to', '01214964817')
params.append('amount', 1000)//number
params.append('comment', 'nap tien')
params.append('name', '')


const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
//http://localhost/momo/checkHistory.php
//https://tyaiti.000webhostapp.com/momolananh/checkHistory.php
const url = 'http://localhost/momo/checkHistory.php'
axios.post(url, params, config)
  .then((result) => {
    // console.log(typeof result);
    console.log(result)
    // console.log(result.data)
    let str = result.data
    let format = str.slice(91, 91) + str.slice(92);
    // console.log(result)
    let ob = JSON.parse(format)
    console.log(ob)
  })
  .catch((err) => {
    console.log(err)
  })
