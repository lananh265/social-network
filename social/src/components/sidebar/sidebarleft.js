import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import s from './home.module.css';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import MoneyIcon from '@mui/icons-material/MonetizationOn';
// import ChatIcon from '@mui/icons-material/Chat';
// import PersonIcon from '@mui/icons-material/Person';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskIcon from '@mui/icons-material/Task';
import "./sidebar.css";
import {
    Home,
    Chat ,
    Person,
    AccountCircle,
    AssignmentTurnedIn,
    MonetizationOn,  
  } from "@material-ui/icons";

export default function Sidebarleft() {
    const [state, setState] = React.useState({
        
      Home: false, 
      
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
         
            <li sidebarListItem>
            <Home className="sidebarIcon" />
            <span className="sidebarListItemText">Home</span></li>
            &emsp;
            <li sidebarListItem>
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Message</span></li>
            &emsp;
            <li sidebarListItem>
            <Person className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span></li>
            &emsp;
        </List>
        <Divider />
        <List>
           <li sidebarListItem>
           <AccountCircle className="sidebarIcon" />
           <span className="sidebarListItemText">Infor</span></li>
           &emsp;
           <li sidebarListItem>
            <AssignmentTurnedIn className="sidebarIcon" />
            <span className="sidebarListItemText">Task</span></li>
            &emsp;
            <li sidebarListItem>
            <MonetizationOn className="sidebarIcon" />
            <span className="sidebarListItemText">Money</span></li>
            &emsp;
           
        </List>
      </Box>
    );
    return (
        <div className="sidebar">
        {['Home'].map((anchor) => (
          <React.Fragment key={anchor}>
            <button className={`${s.button} ${s.fontsize}`}onClick={toggleDrawer(anchor, true)} >{anchor}</button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
     
    );
        }