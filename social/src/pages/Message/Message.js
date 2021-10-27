// import Chat from "../../components/chat/chat4"
// import Sidebar from "../components/sidebar/Sidebar";
// import Rightbar from "../../components/rightbar/Rightbar";
// import RightMess from "../../components/rightbar/RightMess"
// import Sidebar from "../../components/sidebar/Sidebar2"
import Chat from "./Chat"
// import s from "./message.module.css"
import { useLocation } from 'react-router-dom'

export default function Message(){
    const location = useLocation()
    let contact = {
      show: true
    }
    if(location.state){
      contact = location.state
    }
    // console.log(contact)
    
    return(
      <div >
        <Chat contact={contact}/>
      </div>
    )
  }
