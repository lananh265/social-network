// import { Chat } from "@material-ui/icons";
import Chat from "../../components/chat/chat3";
import Sidebar from "../../components/sidebar/sidebar";
import s from "./message.module.css"
import { useState } from "react";
import RightMess from "../../components/rightbar/RightMess"

export default function Message() {
  const [listInbox, setListInbox] = useState([])
  const [targetUser, setTargetUser] = useState({})
    return (
   <div className={s.homeContainer}>
        <Sidebar />
       <Chat setListInbox={setListInbox} targetUser={targetUser} />
        {/* <Rightbar/> */}
        <RightMess listInbox={listInbox} setTargetUser={setTargetUser} />
      
     </div>
  );
  }
  
  
  
  