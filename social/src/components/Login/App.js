import { BrowserRouter, Route, Switch , Redirect} from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard';
import Preferences from './Preferences';
import Login from './Login';
import useToken from './useToken';



  export default function App (){
    const { token, luuToken } = useToken();

    const [isAuth, setIsAuth] = useState(true);

    if(!isAuth){
        return <Redirect to="/login" />
    }

    // const token = layTokenCu();
    // const [token, setToken] = useState();
    // if(! token){
    //     return <Login nhanToken = {luuToken} />
    // }

    return(
        <div>
            <h1>Day la App </h1>

            <button onClick={() => setIsAuth(false)}>Logout</button><br/>
            <div>isAuth: {isAuth.toString()}</div>

            <BrowserRouter>
            <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/preferences">
                <Preferences />
            </Route>
           
            </Switch>
            </BrowserRouter>
        </div>
    )
  }