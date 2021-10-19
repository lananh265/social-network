// import useToken from "../API/useToken";
import { GlobalStyle } from "../../components/css/cssformHome";
import Topbar2 from "../../components/topbar/Topbar2";
// import Sidebarleft from "../sidebarleft/Sidebarleft";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Sidebarleft from "../components/sidebarleft/Sidebarleft"
import Message from "../Message/Message";
import Profile from "../Profile/Profile";
import Infor from "../Infor/Infor";
import Task from "../Task/Task";
import Money from "../Money/Money";
import Feedback from "../Feedback/Feedback";
import Note from "../Note/Note";
import Status from "../../components/status/status";
import Share from "../../components/share/Share";
import "../../components/css/home.css"
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/sidebar";
import Body from "../../components/Body/Body";
import Banner from "../../components/banner/banner";
import { useState } from "react";


export default function Home() {
    const [search, setSearch] = useState([{}])
    const [formBody, setFormBody] = useState(true)
    
    return (

   <div>
       <GlobalStyle />
       <Router>
            <Topbar2 setSearch={setSearch}/> 
            <Banner />
            <br/>
            <Switch>
                <Route 
                exact path="/"
                render={() => {
                    return <Body search={search}/>
                }}>
                </Route>

                <Route path="/message"> <Message /> </Route>
                <Route path="/profile"> <Profile /> </Route>
                <Route path="/infor"><Infor /></Route>
                <Route path="/task"> <Task /> </Route>
                <Route path="/money"> <Money /> </Route>
                <Route path="/feedback"> <Feedback /> </Route>
                <Route path="/note"> <Note/> </Route>
                
                {/* <Route path="/feedback"> <Feedback /> </Route> */}
                </Switch> 
       </Router>
      
    </div>
       
  );
  }
  
  
  
  