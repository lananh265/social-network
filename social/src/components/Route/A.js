import {useState, Fragment} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
    Link
  } from "react-router-dom";
export default function A(){
    
        const [state, setState] = useState({
         
          left: false,
          
        });
        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
              return;
            }
        
            setState({ ...state, [anchor]: open });
          };


          const showIcon =(index)=>{
              if (index === 0){
                  return <MailIcon />

              }
              if (index === 1){
                  return <InboxIcon />

            }
            if (index === 2){
                return <MailIcon />

            }
              return <MailIcon />

          }
          const thongBao = (text)=>{
            alert (text)
        }
        const list = (anchor) => (
            <Box
              sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List>
                {['A', 'B', 'C'].map((text, index) => (
                    
                  <ListItem type="button" onClick={()=>{thongBao(text)}}  key={text}>
                    <Link to={text}>
                    <ListItemIcon>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      {showIcon(index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Divider />
             
            </Box>
          );
    return (
        <div>

            {/* Day la A
            <Link to="/B">Di sang B</Link>
            <Link to="/c">Di sang C</Link> */}

         {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}

        </div>
    )
}