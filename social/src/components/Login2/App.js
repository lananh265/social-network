import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Preferences from './Preferences';
import useToken from './useToken';

function App() {

  const { token, luuToken } = useToken();
  //
  if(!token) {
    return <Login nhanToken={luuToken} />
  }

  return (
    <div>
      <h1>App</h1>
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
  );
}

export default App;
