import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import Welcome from "./components/footer/Welcome";
import Footer from "./components/footer/Footer";

// import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Gioithieu from "./components/Gioithieu/Gioithieu";
import Chinhsach from "./components/Chinhsach/Chinhsach";
import Khieunai from "./components/Khieunai/Khieunai";
// import Gopy from "./Gopy/Gopy";

import Gopy from "./components/Gopy/Gopy2";

// import './App.scss';
// import Header from './components/Header';
// import NotFound from '/components/NotFound';
// import Footer from "./components/footer/Footer";

import Header from './components/Gopy/header';
import App2 from "./components/Gopy/App";

import Ref from "./components/Gopy/ref";
 import Chat from "./components/chat/chat5";

function App() {
  const [token, setToken] = useState("abc"); //token = "dang nhap thanh cong"

  if(!token) {
    return <Welcome nhanProps = {setToken}/>
  }

  return (


  <div>
  <BrowserRouter>
    <Switch>
      <Route path="/">
        {/* <Home /> */}
        {/* <Profile /> */}

        {/* <Gioithieu /> */}


        {/* <Chinhsach /> */}
        {/* <Khieunai/> */}
        {/* <Gopy /> */}
{/* 
<Header /> */}

{/* <Ref /> */}
{/* <Welcome /> */}

<Chat />

      </Route>
    </Switch>
  </BrowserRouter>
</div>
);
}
  

export default App;


