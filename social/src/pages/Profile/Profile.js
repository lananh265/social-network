// import useToken from "../API/useToken";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Message from "../Message/Message";
import Infor from "../Infor/Infor";
import Task from "../Task/Task";
import Money from "../Money/Money";
import Feedback from "../Feedback/Feedback";
import Status from "../../components/status/status";
import Share from "../../components/share/Share";
import "../../components/css/home.css"
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/sidebar";
import { useState } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import s from "./profile.module.css"

export default function Profile() {
    
    const [formBody, setFormBody] = useState(true)
    
    return (
        <>
        <div className={s.homeContainer}>
            <Sidebar />
           <div className={s.body}>
            <div className={`${s.profileRight}`}>
                <div className={`${s.profileRightTop}`}> 
                    <div className={`${s.profileCover}`}> 
                    <img
                        className={`${s.profileUserImg}`}
                        src="assets/person/3.jpg"
                        alt=""
                    />
                </div>
             <div className={`${s.profileInfo}`}>
                <h4 className={`${s.profileInfoName}`}>Safak Kocaoglu</h4>
            </div>
                </div>
            </div>

            <div className={s.share}>
        <Share />
        </div>
        </div>
            {/* <Rightbar profile /> */}
            <div className= {s.rightbar} >

        </div>
     </div>
     
        </>
   );
   }
   