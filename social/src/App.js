// import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import useToken from "./API/useToken";
import Naptien from "./pages/Naptien/Naptien";
export default function App() {
  // const [token, setToken] = useState("")

const {token, luuToken} = useToken()

  if(!token){
    return <Login layToken={luuToken} /> //props:layToken
  }
  if(!token.zptransid){
    return <Naptien />
  }
  return (
 <div>
   <Home />

 </div>

);
}



