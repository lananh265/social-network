var str = `<script type='text/javascript'>
        console.log('connect success !');
     </script>{"error":0,"msg":"Thành công","balance":"41446","tranid":188430941
65}`

// console.log(str.substring( 0, str.indexOf( `connect` ) ))

let dummyString=`<script type='text/javascript'>
        console.log('connect success !');
     </script>{"error":0,"msg":"Thành công","balance":"41446","tranid":18843094165}`
dummyString = dummyString.replace(`<script type='text/javascript'>
        console.log('connect success !');
     </script>`,'')
// console.log(typeof(dummyString))
// var myobj = JSON.parse((dummyString));

const obj = JSON.parse(dummyString);
console.log((obj.msg))
// const obj = JSON.parse('{"name":"John", "age":30, "city":188430941}');
// console.log(typeof(obj))
