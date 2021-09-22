import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import s from './home.module.css';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskIcon from '@mui/icons-material/Task';
import "./sidebar.css";
import {
  Link
} from "react-router-dom";
import {
    Home,
    Chat ,
    Person,
    AccountCircle,
    AssignmentTurnedIn,
    MonetizationOn,
    Message,
    Money,  
  } from "@material-ui/icons";
import Task from '@mui/icons-material/Task';

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

    const showIcon = (index)=>{
      if (index === 0){
        return <Home />
      }
      if (index === 1){
        return <Chat />
      }
      if (index === 2){
        return <Person />
      }
    }

    const showIconn = (index)=>{
      if (index === 0){
        return <AccountCircle />
      }
      if (index === 1){
        return <Task />
      }
      if (index === 2){
        return <MonetizationOn />
      }
    }
  
    const thongBao = (text)=>{
      alert(text)
    }
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
         

        {['Home', 'Message', 'Profile'].map((text, index) => (
        <Link to={text}>     
        <ListItem type="button" onClick={()=>{thongBao(text)}}  key={text}>
        <ListItemIcon>
        {showIcon(index)}
        </ListItemIcon>        
        <ListItemText primary={text} />
        </ListItem>
        </Link>
        ))}
        
        </List>
        <Divider />
        <List>
        {['Infor', 'Task', 'Money'].map((text, index) => (
                    <Link to={text}>
                    <ListItem type="button" onClick={()=>{thongBao(text)}}  key={text}>
                    <ListItemIcon>
                    {showIconn(index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                    </Link>
                    ))}
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