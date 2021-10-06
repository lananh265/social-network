// import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import useToken from "./API/useToken";

export default function App() {
  // const [token, setToken] = useState("")

const {token, luuToken} = useToken()

  if(!token.status){
    return <Login layToken={luuToken} /> //props:layToken
  }
  return (
 <div>
   <Home />

 </div>

);
}



