import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {useState} from "react";

import Login from "./Login";
import About from "./About";

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


  return (
    <div>
    <Router>
    <h1>App </h1>
    <button><Link to="/About">About</Link></button>

            <Switch>
                <Route path="/login">
                <Login />
                </Route>
                <Route path="/about">
                <About />
                </Route>
            </Switch>
            <button onClick={()=>{dangXuat()}}>Logout</button>
        </Router>
    </div>
  )
}
