import A from "./A";
import B from "./B";
import C from "./C";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import Login from "./login";
import { useState } from "react";
import useToken from "../../API/useToken";

export default function App(){
    // const [token, setToken] =useState();
    const { token, luuToken } = useToken();
    if(!token){
        return <Login nhanToken={luuToken} />
    }
    return (
        <div>
            <Router>
                <A/>
                <Switch>
                    <Route path="/A"> <A /> </Route>
                    <Route path="/b"> <B /> </Route>
                    <Route path="/C"> <C /> </Route>
                </Switch>
            </Router>

        </div>
    )
}