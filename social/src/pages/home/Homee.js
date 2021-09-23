import * as React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/sidebarleft";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import Sidebarleft from '../../components/sidebar/sidebarleft';
import { GlobalStyle} from './cssform';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import useToken from "../../API/useToken";
import Welcome from '../../components/Gioithieu/Welcome';
export default function Home() {
  const { token, luuToken } = useToken();
  if(!token){
      return <Welcome nhanToken={luuToken} />
  }
  return (
    <>
    
    <Topbar />
       <div className="home">
        <Sidebarleft />
        <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/LANA.VN.png"
                alt=""
              />
            </div>
            
          </div>
          <div className="homeContainer">
        <Feed/>
        <Rightbar/>
        <GlobalStyle />
      </div>
      </div>
    </div>
    </>
  );
}
