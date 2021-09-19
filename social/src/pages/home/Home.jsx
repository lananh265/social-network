import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/MoveToHome';
// import MoneyIcon from '@mui/icons-material/Money';

export default function Home() {

  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });
  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event &&
  //     event.type === 'keydown' &&
  //     (event.key === 'Tab' || event.key === 'Shift')
  //   ) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };
  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       {['Home', 'Message', 'Profile', 'Task', 'Infor' , 'Money'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <HomeIcon /> : <MoneyIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     </Box>

  return (
    <>
      
      <Topbar />

      <div className="home">
        <Sidebar />
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

      {/* <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div> */}


      </div>
    </>
  );
}
