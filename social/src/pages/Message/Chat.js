import { useState, useRef, useEffect } from "react"
import socketIOClient from "socket.io-client";
import s from "./chat.module.css"
import GetAvatar from "../../API/GetAvatar";
import GetInfor from "../../API/GetInfor"
import UserInbox from "../../API/UserInbox"
import GetMess from "../../API/GetMess"

const host = "http://192.168.1.2:4000/"
const src = "http://192.168.1.2/server-node/v0.1/server/images/avatars/"

export default function Chat(){
    const {token} = GetInfor()
    const [listInbox, setListInbox] = useState([])      //chua danh sach minh da inbox
    const [idSocket, setIdSocket] = useState(0)         //duoc server cap cho socket id
    const [avatar, setAvatar] = useState({})            //lay avatar cua minh
    const [targetUser, setTargetUser] = useState({})    //chua thong tin ob target
    const [showNoti, setShowNoti] = useState(true)      //mo hoac dong Noti
    const [tn, setTN] = useState("")                    //luu tin nhan nguoi nhap
    const [listMess, setListMess] = useState([])        //chua tin nhan Noti

    const [renMess, setRenMess] = useState(0)          // index de chay map renderMess2
    const messagesEnd = useRef();
    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    //show list tin nhan Noti
    const renderMess =  listMess.map((m, index) =>
    <div key={index} className={`${m.connecter_id === token.id ? s.your_message : s.other_people} ${s.chat_item} `}>
    {m.name}{' '}{m.text_me}
    </div>)
    //check index cua targetUser
    
    const findIndex = (id)=>{
        console.log(listInbox)
        var index = listInbox.map(function(e,index) {return e.id}).indexOf(id)
        console.log('ke qua '+index)
        if(index >=0){
            return index
        }else{ return 0}
    }
    //show tin nhan 1-1
    const renderMess2 =  listMess.map((m, index) =>
    <div key={index} >
    {(m.connecter_id==token.id)&&(m.target_id==targetUser.id)? 
        <div className={`${s.your_message} ${s.chat_item}`}>{m.name}{' '}{m.text_me}</div> : 
        <></> }
    {(m.target_id==token.id)&&(m.connecter_id==targetUser.id)? 
        <div className={`${s.other_people} ${s.chat_item}`}>{m.name}{' '}{m.text_me}</div> : 
        <></> }
    </div>)

    //gui tin nhan
    const Send = ()=>{
        if(tn.length>0 && targetUser.id>0){
            let ob = {
                id: idSocket,
                name: token.name,
                connecter_id: token.id,
                target_id: targetUser.id,
                text_me: tn
            }
            socketRef.current.emit("mess-out",ob)
            setTN("")
            
        }
    }
    //bat su kien enter va gui tin nhan
    const _handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            Send()
          }
    }


//load Message cu
useEffect(()=>{
    let mounted = true;
    let ob = {
        id: token.id
    }
   GetMess(ob)
     .then(items => {
       if(mounted) {
         setListMess(items)
       }
     })
   return () => mounted = false;

},[]) 

    //lay thong tin toan bo user inbox voi minh listInbox
    useEffect(() => {
        let mounted = true;
        UserInbox({connecter_id: token.id})
          .then(items => {
            if(mounted) {
              setListInbox(items)
            //   console.log(items)
            }
          })
        return () => mounted = false;
      }, [])
    
    //connect socket io and get idSocket
    let socketRef = useRef()
    useEffect( ()=>{
        socketRef.current = socketIOClient.connect(host)
        socketRef.current.on("getId", (data)=>{
            if(!data){

            }else{
                const obSocket = {
                    username: token.username,
                    connecter_id: token.id,
                    socket_id: data
                }
                socketRef.current.emit("client-send-obSocket",obSocket)
            }
            setIdSocket(data)
            console.log(data)
            
        })
        socketRef.current.on("mess-in", (data)=>{
            setListMess( (listMess)=>[...listMess,data])
            scrollToBottom()
        })
    },[])

    //lay avatar cua minh
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
                // console.log(items[0].avatar)
            }
        })
        return () => mounted = false;
    },[])
    
 return(
    <div className={s.homeContainer}>

        <div className={s.leftbar}>
                <h4>Bên trái chat với {targetUser.id}</h4>
        </div>

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
        {showNoti ?
        <div className={s.box_chat} >
            <div className={s.box_chat_message} >
                {renderMess}
                <div style={{ float:"left", clear: "both" }}
                    ref={messagesEnd}>
                </div>
            </div>
        </div>
        :
        <div className={s.box_chat} >
            <div className={s.box_chat_message} >
                {renderMess2}
                <div style={{ float:"left", clear: "both" }}
                        ref={messagesEnd}>
                </div>
            </div>
            <div className={s.send_box} >
                <textarea
                    value={tn}
                    onKeyDown={(e)=>{_handleKeyDown(e)}}
                    onChange={(e)=>{setTN(e.target.value)}}
                    placeholder="Nhập tin nhắn ..."
                />
                <button className={s.button} onClick={Send}> Send </button>
            </div>
        </div>
        }
        


        <div className={s.rightbar}>
            <div className={s.rightbarWrapper}>
                <h4 className={s.rightbarTitle}>Danh sách đối tác</h4>
                <img className={s.rightbarProfileImg} src={`${src+"user.png"}`} alt="" 
                    onClick={()=>{setShowNoti(true); setTargetUser({})}}/>
                <ul className={s.rightbarFriendList}>
                {listInbox.map((u) => (
                    <div key={u.id}>
                        <li className={s.rightbarFriend}>
                
                        <div className={s.rightbarProfileImgContainer} 
                            onClick={()=>{setTargetUser(u); setShowNoti(false);
                                } }>
                        <img className={s.rightbarProfileImg} src={src+u.avatar} alt="" />
                        <span className={s.rightbarOnline}></span>
                        </div>
                        <span className={s.rightbarUsername}>{u.name}</span>
                
                        </li>
                    </div>
                ))}
                </ul>
            </div>
        </div>
    </div>
 )
}