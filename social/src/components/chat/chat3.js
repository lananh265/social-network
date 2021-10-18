import { useState, useRef, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client"
import s from "./chat.module.css"
import GetAvatar from "../../API/GetAvatar";
import GetInfor from "../../API/GetInfor"
const src="http://localhost:1337/server-node/v0.1/server/images/avatars/"
const host ="http://localhost:4000/"
export default function Chat(){
  const [avatar, setAvatar] = useState({})
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

    const [id, setId] = useState()
    const [listTN, setlistTN] = useState([])
    const [tn, setTN] = useState("")
    const [target_id, setTarget_ID] = useState("")
    const messagesEnd = useRef();

    let socketRef = useRef()
    const [connecter_id, setConnecter_ID] = useState("")//Lan Anhnh
    // const [target_id, setTarget_ID] = useState("2")//ty

    const Send = ()=>{
        if(tn.length>0){
        // let ob = {
        //     id:id,
        //     name: target_id ==="1" ? "Lan Anh" : "Ty",
        //     connecter_id: target_id==="1" ? "2" : "1" ,
        //     target_id: target_id,
        //     text_me: tn
        // }
        let ob = {
          id:id,
          name: target_id ==="1" ? "Lan Anh" : "Ty",
          connecter_id: "1",
          target_id: "2",
          text_me: tn
      }
        socketRef.current.emit("mess-out",ob) //kenh chat: messout
        setTN("")
    }
}

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
    useEffect( ()=>{
      let mounted = true;
      let ob = {
        id: token.id
      }
      GetAvatar(ob)
      .then(items => {
          if(mounted) {
              let obImg = {
                src: src+items[0].avatar,
                imageHash: Date.now()
              }
              setAvatar(obImg)
              console.log(items[0].avatar)
          }
      })
      return () => mounted = false;
    },[])

    const _handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            Send()
          }
    }
    
  //   GetAvatar(ob)
  //   .then(items => {
  //       if(mounted) {
  //           let obImg = {
  //             src: src+items[0].avatar,
  //             imageHash: Date.now()
  //           }
  //           setAvatar(obImg)
  //           console.log(items[0].avatar)
  //       }
  //   })
  //   return () => mounted = false;
  // },[])
  

    return(
      <>
      <div className={`${s.bb}`}>
      <div className={`${s.avachat}`}>
      <img className={s.shareProfileImg} src={`${avatar.src}?${avatar.imageHash}`} alt="" />&emsp;
      <img className={s.shareProfileImge} src={`${avatar.src}?${avatar.imageHash}`} alt="" />
      </div>
      </div>
        <div className={`${s.boxchat}`}>
        
        <div className={`${s.boxchatmessage}`}>
        {renderMess}
        <div style={{ float:"left", clear: "both" }}
               ref={messagesEnd}>
          </div>
        </div>
  
        <div className={`${s.sendbox}`}>
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
</>

    )
}