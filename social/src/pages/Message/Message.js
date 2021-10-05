// import { Chat } from "@material-ui/icons";
import Chat from "../../components/chat/chat3";
import Sidebar from "../../components/sidebar/sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import s from "./message.module.css"
export default function Message() {
  
    return (
   <div className={s.homeContainer}>
        <Sidebar />
       <Chat />
        <Rightbar/>
      
       </div>
  );
  }
  
  
  
  