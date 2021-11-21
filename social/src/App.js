// import {useState } from 'react';
import Home from "./pages/Home/Home";
//import Welcome from "./pages/Welcome2";
import useToken from "./API/useToken";

import Login from "./pages/Login/Login";
import NapTien from "./pages/Naptien/Naptien";
import { useState } from "react";
export default function App(){
  // const [token, setToken] = useState("")
  const {token, luuToken} = useToken()
  const tokenString = JSON.parse(localStorage.getItem('token'));
  if(!token){
    return <Login layToken={luuToken} />
  }
  return(
    <div>
      {tokenString.zptransid > 0 ?
        <Home /> : <NapTien />
      }
    </div>
  )
}