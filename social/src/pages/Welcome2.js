import Login from "./Login"
import Chinhsach from "./Chinhsach"
import Khieunai from "./Khieunai"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import { FlashOnTwoTone } from "@material-ui/icons";
import { GlobalStyle } from "../components/css/cssformHome";

export default function Welcome({layToken}){
  const [login, setLogin] = useState(true)
  const [chinhsach, setChinhsach]= useState(false)
  const [khieunai, setKhieunai] =useState(false)
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
      <GlobalStyle />
       <Router>
            <Login /> 
            <Switch>
                <Route path="/login"> <Login /> </Route>
                <Route path="/chinhsach"> <Chinhsach /> </Route>
                <Route path="/khieunai"> <Khieunai /> </Route>
                </Switch> 
       </Router>
       {checkForm}
    </div>
  )
}