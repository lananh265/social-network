let result = '\r\n' +
    "<script type='text/javascript'>\r\n" +
    "        console.log('connect success !');\r\n" +
    '     </script>{"error":0,"msg":"Thành công","balance":"40746","tranid":18856182717}'
// console.log(result)

let format = result.slice(91, 91) + result.slice(92);
// console.log(result)
let ob = JSON.parse(format)
console.log(ob.balance)
