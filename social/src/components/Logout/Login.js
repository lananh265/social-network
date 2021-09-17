

import {useState} from'react'
// function saveToken(token){
//   const ob = {
//     token: token.token //"test123"
//   }
//   localStorage.setItem("token",JSON.stringify(ob))
//   return token //{token:"test123"}
// }

function saveToken(token){
  const ob = {
      token: token.token //"test123"
  }
  localStorage.setItem("token", JSON.stringify(ob))
  //return token   //{ token: "test123"}
}

async function loginUser(ob) {
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ob)
  })
    .then(data => data.json())
 }


export default function Login ({thayDoiToken}){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

//luu token vao mot bien:
  const [token, setToken]=useState({});


  const taiKhoan = (giatrinhap) =>{
    setUserName(giatrinhap.target.value);
}
const pass = (giatrinhap) =>{
    setPassword(giatrinhap.target.value);
}

  // const dangNhap =()=>{
    // thayDoiToken(saveToken())

  //   const url = "http://localhost:4000/login";
  //   fetch(url,{
  //     method: "GET",
      
  //   })
  //   .then((dulieu)=>dulieu.json())
  //   .then((dulieuJson)=>{
  //     setToken(dulieuJson)
  //     console.log(dulieuJson);
  //   })
  //   .catch((error)=>{
  //     console.log("Loi dang nhap: "+error);
  //   }, []);

  //   thayDoiToken(saveToken(token))

  // }
  const dangNhap = async e => {
    e.preventDefault();
    const ob = {
        username: username,
        password: password
    }
    const token = await loginUser(ob);
    setToken(token); // {token:"test123"}
    saveToken(token)
    thayDoiToken(token) // bang voi ham setToken(token) ben App
  }

  return (
    <div>
    <h1>Login of:  {token.token}</h1>
    <div>
      <form>
        <label>
          <p>Username: </p>
          <input type = "text" onChange={(e)=>{taiKhoan(e)}} />
        </label>
        <br/>
        <label>
          <p>Password: </p>
          <input type = "password" onChange={(e)=>{pass(e)}}/>
        </label>
      </form>
      <button onClick={dangNhap}>Login</button>
    </div>
    </div>
  )
}
