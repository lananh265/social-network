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

export default function Home() {

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
                src="assets/post/ban.PNG"
                alt=""
              />
            </div>
            
          </div>
          <div className="homeContainer">
        <Feed/>
        <Rightbar/>
      </div>
      </div>
    </div>
    </>
  );
}
