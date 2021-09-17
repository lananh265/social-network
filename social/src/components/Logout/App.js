import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {useState} from "react";

import Login from "./Login";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
function GetToken(){
  const token = localStorage.getItem('token')
  const UserToken = JSON.parse(token)
  return UserToken?.token
}


export default function App (){
  const [token, setToken] = useState(GetToken())
  const dangXuat = ()=>{
    localStorage.removeItem("token");
    // setToken(false)
    window.location.href = '/';
  }
  if(!token){
    return <Login thayDoiToken = {setToken} />
  }
  // if(!token){
  //   return <Home />
  // }


  return (
    <div>
    <Router>
    <Home />
    
            <Switch>
                <Route path="/home">
                <Home />
                </Route>
                <Route path="/about">
                <About />
                </Route>
                <Route path="/contact">
                <Contact />
                </Route>
            </Switch>
            <button onClick={()=>{dangXuat()}}>Logout</button>
        </Router>
    </div>
  )
}
