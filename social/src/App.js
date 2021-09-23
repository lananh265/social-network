import Homee from "./pages/home/Homee";
// import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
// import Register from "./pages/register/Register";

import Welcome from "./components/Gioithieu/Welcome";
// import Footer from "./components/footer/Footer";

// import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from "react";
// import Gioithieu from "./components/Gioithieu/Gioithieu";
// import Chinhsach from "./components/Chinhsach/Chinhsach";
// import Khieunai from "./components/Khieunai/Khieunai";
// import Gopy from "./Gopy/Gopy";

// import Gopy from "./components/Gopy/Gopy2";

// import './App.scss';
// import Header from './components/Header';
// import NotFound from '/components/NotFound';
// import Footer from "./components/footer/Footer";

// import Header from './components/Gopy/header';
import App2 from "./components/Gopy/App";

// import Ref from "./components/Gopy/ref";
//  import Chat from "./components/chat/chat2";
import useToken from "./API/useToken";
function App() {
  // const [state, setSate] = useState()
  const {token, luuToken} = useToken()
  if(!token) {
    return <Welcome nhanToken = {luuToken}/>
  }

  return (


  <div>
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Homee />
        {/* <Profile /> */}
        {/* <App2 /> */}
        {/* <Left /> */}
{/* 
<Header /> */}

{/* <Ref /> */}

{/* <Welcome /> */}

{/* <Chat /> */}

      </Route>
    </Switch>
  </BrowserRouter>
</div>
);
}
  

export default App;


