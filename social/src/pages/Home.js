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

export default function Home() {
    
    return (
   <div>
       <GlobalStyle />
       <Router>
            <Topbar2 /> 
            <Switch>
                {/* <Route path="/home"></Route> */}
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
  
  
  
  