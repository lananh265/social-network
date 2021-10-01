// import useToken from "../API/useToken";
import { GlobalStyle } from "../components/css/cssformHome";
import Topbar2 from "../components/topbar/Topbar2";
// import Sidebarleft from "../sidebarleft/Sidebarleft";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Sidebarleft from "../components/sidebarleft/Sidebarleft"
import Message from "./Message";
import Profile from "./Profile";
import Infor from "./Infor";
import Task from "./Task";
import Money from "./Money";
import Feedback from "./Feedback";
import Status from "../components/status/status";
import Poststatus from "../components/poststatus/Poststatus"
import "../components/css/home.css"
import Feed from "../components/feed/Feed";
import Sidebar from "../components/sidebar/sidebar";
import Rightbar from "../components/rightbar/Rightbar";
import Body from "../components/Body/Body";
import Banner from "../components/banner/banner";
import { useState } from "react";


export default function Home() {
    
    const [formBody, setFormBody] = useState(true)
    
    return (

   <div>
       <GlobalStyle />
       <Router>
            <Topbar2 /> 
            <Banner />
            <br/>
            <Switch>
                <Route 
                exact path="/"
                render={() => {
                    return <Body/>
                }}>
                </Route>

                <Route path="/message"> <Message /> </Route>
                <Route path="/profile"> <Profile /> </Route>
                <Route path="/infor"> <Infor /> </Route>
                <Route path="/task"> <Task /> </Route>
                <Route path="/money"> <Money /> </Route>
                <Route path="/feedback"> <Feedback /> </Route>
                
                {/* <Route path="/feedback"> <Feedback /> </Route> */}
                </Switch> 
       </Router>
      
    </div>
       
  );
  }
  
  
  
  