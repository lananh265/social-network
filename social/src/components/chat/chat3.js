import { useState, useRef, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client"
import s from "./chat.module.css"
import GetAvatar from "../../API/GetAvatar";
import GetInfor from "../../API/GetInfor"
import UserInbox from "../../API/UserInbox";
const src="http://localhost:1337/server-node/v0.1/server/images/avatars/"
const host ="http://localhost:4000/"

const obTarget = {
  target_id: "",
  name: "",
  id: ""
}
export default function Chat({setListInbox, targetUser}){
  const [target, setTarget] = useState(obTarget)
  const [avatar, setAvatar] = useState({})
  // const tokenString = localStorage.getItem('token');
  // const token = JSON.parse(tokenString);

    const [id, setId] = useState()
    const [listTN, setlistTN] = useState([])
    const [tn, setTN] = useState("")
    const [target_id, setTarget_ID] = useState("")
    const messagesEnd = useRef();

    const inputTarget = (e)=>{
      const inputName = e.currentTarget.name;
      const value = e.currentTarget.value;
      setTarget(prev => ({ ...prev, [inputName]: value }));  
  }
    const {token} = GetInfor()
    let socketRef = useRef()
    const [connecter_id, setConnecter_ID] = useState("")//Lan Anhnh
    // const [target_id, setTarget_ID] = useState("2")//ty

    const Send = ()=>{
      if(tn.length>0 && targetUser.id>0){
          let ob = {
              id: id,
              name: token.name,
              connecter_id: token.id,
              target_id: targetUser.id,
              text_me: tn
          }
          socketRef.current.emit("mess-out",ob)
          setTN("")
      }
  }

const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }

const renderMess =  listTN.map((m, index) => 
<div key={index} className={`${m.connecter_id === token.id ? `${s.yourmessage}` : `${s.otherpeople}`} ${s.chatitem}`}>  
  {m.name} {m.text_me}
</div>
)

    // useEffect( ()=>{
    //     socketRef.current = socketIOClient.connect(host)
    //     socketRef.current.on("getId",(data)=>{
    //         setId(data)
    //     })
    //     socketRef.current.on("mess-in", (data)=>{
    //         setlistTN((listTN)=> [...listTN,data])
    //         console.log(data)
    //         console.log(listTN)
    //         scrollToBottom()
    //     })
    // }, [])

    useEffect( ()=>{
      socketRef.current = socketIOClient.connect(host)
      socketRef.current.on("getId", (data)=>{
          if(!data){
            // alert("C???nh b??o: ai ???? ???? ????ng nh???p v??o t??i kho???n c???a b???n !")
        }
          else{
              const obSocket = {
                  username: token.username,
                  connecter_id: token.id,
                  socket_id: data
              }
              socketRef.current.emit("client-send-obSocket",obSocket)
          }
          setId(data)
      })
      
      setTimeout(function() {
          console.log(id)
        }, 500); //time out
      
      
      socketRef.current.on("mess-in", (data)=>{
          setlistTN( (listTN)=>[...listTN,data])
          scrollToBottom()
      })
  },[])  


    
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
  
  useEffect(() => {
    let mounted = true;
    UserInbox({connecter_id: token.id})
      .then(items => {
        if(mounted) {
         console.log(items)
          setListInbox(items)
        }
      })
    return () => mounted = false;
  }, [])

    return(
      <>
      <div className={`${s.bb}`}>
      <div className={`${s.avachat}`}>
      <img className={s.shareProfileImg} src={`${avatar.src}?${avatar.imageHash}`} alt="" />&emsp;
                {
                    targetUser.id? 
                    <img className={s.shareProfileImge} src={`${src+targetUser.avatar}`} alt="" />
                    : 
                    <img className={s.shareProfileImge} src={`${src+"user.png"}`} alt="" />
                }
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
              placeholder="Nh???p tin nh???n ..." 
            />
            <button className={`${s.button}`} onClick={()=>{Send()}}>
            G???i
            </button>
        </div>
  
      </div>
</>

    )
}