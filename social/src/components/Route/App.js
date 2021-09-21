import A from "./A";
import B from "./B";
import C from "./C";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
export default function App(){
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