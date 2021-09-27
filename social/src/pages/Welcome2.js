import Login from "./Login"
import Chinhsach from "./Chinhsach"
import Khieunai from "./Khieunai"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import { FlashOnTwoTone } from "@material-ui/icons";

export default function Welcome({layToken}){
  const [login, setLogin] = useState(true)
  const [chinhsach, setChinhsach]= useState(false)
  const checkForm = () =>{
    if(login){
      return <Login layToken={layToken} />
    }
  }
  
  useEffect( ()=>{
    console.log("welcome")
  })

  return(
    <div>
      {/* <button onClick={()=>{setLogin(true); setChinhsach(false)}}>Login</button>
      <button onClick={()=>{setLogin(false); setChinhsach(true)}}>Chính Sách</button> */}
      {/* <button onClick={showForm("khieunai")}>Khiếu Nại</button> */}
      {checkForm}
    </div>
  )
}