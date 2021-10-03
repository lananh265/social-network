import { useState, useRef, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client"
import s from "./chat.module.css"

const host ="http://localhost:4000/"
export default function Chat(){
    const [id, setId] = useState()
    const [listTN, setlistTN] = useState([])
    const [tn, setTN] = useState("")
    const [target_id, setTarget_ID] = useState("")
    const messagesEnd = useRef();

    let socketRef = useRef()
    const [connecter_id, setConnecter_ID] = useState("1")//Lan Anhnh
    // const [target_id, setTarget_ID] = useState("2")//ty

    const Send = ()=>{
        if(tn.length>0){
        let ob = {
            id:id,
            name: target_id ==="1" ? "Lan Anh" : "Ty",
            connecter_id: target_id==="1" ? "2" : "1" ,
            target_id: target_id,
            text_me: tn
        }
        socketRef.current.emit("mess-out",ob) //kenh chat: messout
        setTN("")
    }
}

   
//   const loadTn = listTN.map ( (e, index)=>
//   <div key = {index}>
//     {e.name} {e.text_me}
//   </div>
// )

const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }

const renderMess =  listTN.map((m, index) => 
<div key={index} className={`${m.id === id ? `${s.yourmessage}` : `${s.otherpeople}`} ${s.chatitem}`}>  
  {m.name} {m.text_me}
</div>
)

    useEffect( ()=>{
        socketRef.current = socketIOClient.connect(host)
        socketRef.current.on("getId",(data)=>{
            setId(data)
        })
        socketRef.current.on("mess-in", (data)=>{
            setlistTN((listTN)=> [...listTN,data])
            console.log(data)
            console.log(listTN)
            scrollToBottom()
        })
    }, [])

    const _handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            Send()
          }
    }

  

    return(
        <div className={`${s.boxchat}`}>
        <div class={`${s.boxchatmessage}`}>
        {renderMess}
        <div style={{ float:"left", clear: "both" }}
               ref={messagesEnd}>
          </div>
        </div>
  
        <div class={`${s.sendbox}`}>
            <textarea 
              value={tn}  
              onKeyDown={(e)=>{_handleKeyDown(e)}}
              onChange={(e)=>{setTN(e.target.value)}}
              placeholder="Nhập tin nhắn ..." 
            />
            <button className={`${s.button}`} onClick={()=>{Send()}}>
            Gửi
            </button>

            
        </div>
  
      </div>


    )
}