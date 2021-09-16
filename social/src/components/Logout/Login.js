


function saveToken(){
  const ob = {
    token: "test123"
  }
  localStorage.setItem("token",JSON.stringify(ob))
  return true
}
export default function Login ({thayDoiToken}){

  const dangNhap =()=>{
    thayDoiToken(saveToken())

  }

  return (
    <div>
    <h1>Login</h1>
    <button onClick={()=>{dangNhap()}}>Login</button>
    </div>
  )
}
