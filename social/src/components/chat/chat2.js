import { SettingsSystemDaydream } from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client"

export default function Chat(){
  const [tinNhan, settinNhan] = useState("");
  let dem=useRef(0);
  const xuLy = ()=>{
    // settinNhan(tinNhan + "a-")
    dem.current++;
    console.log(dem.current);
    
  }
  


 let socketRef = useRef();

useEffect( ()=>{
  console.log ("render Chat")


},[])
  return(
    <div>
      <h1>Day la Chat</h1>
      {tinNhan}
       <button onClick = {()=>{xuLy()}}>Thay doi noi dung State</button>
    </div>
  )

}