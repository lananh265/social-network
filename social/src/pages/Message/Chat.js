import { useState, useRef, useEffect } from "react"
import socketIOClient from "socket.io-client";
import s from "./chat.module.css"
import GetAvatar from "../../API/GetAvatar";
import GetInfor from "../../API/GetInfor"
import UserInbox from "../../API/UserInbox"
import GetMess from "../../API/GetMess";
import GetUser from "../../API/GetUser";
import { Url } from "../../API/url";

const host = "http://localhost:4000/"


const src = Url.img

export default function Chat({contact}){
    // console.log(contact)
    const {token} = GetInfor()
    const [listInbox, setListInbox] = useState([])      //chua danh sach minh da inbox
    const [idSocket, setIdSocket] = useState(0)         //duoc server cap cho socket id
    const [avatar, setAvatar] = useState({})            //lay avatar cua minh
    const [targetUser, setTargetUser] = useState(contact)    //chua thong tin ob target
    const [showNoti, setShowNoti] = useState(contact.show)      //mo hoac dong Noti
    const [tn, setTN] = useState("")                    //luu tin nhan nguoi nhap
    const [listMess, setListMess] = useState([])        //chua tin nhan cu va moi
    const [newMess, setNewMess] = useState([])          //chua tin nhan Noti

    const [online, setOnline] = useState([])            //mang user online
    // const [target, setTarget] = useState("")            //input id target
    const messagesEnd = useRef();
    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    //show list tin nhan Noti
    const renderMess =  newMess.map((m, index) =>
    <div key={index} className={`${m.connecter_id === token.id ? s.your_message : s.other_people} ${s.chat_item} `}>
    {m.name}{' '}{m.text_me}
    </div>)   
    
    //show tin nhan 1-1
    const renderMess2 =  listMess.map((m, index) =>
    <div key={index} >
    {(m.connecter_id===token.id)&&(m.target_id===targetUser.id)? 
        <div className={`${s.your_message} ${s.chat_item}`}>{m.name}{' '}{m.text_me}</div> : 
        <></> }
    {(m.target_id===token.id)&&(m.connecter_id===targetUser.id)? 
        <div className={`${s.other_people} ${s.chat_item}`}>{m.name}{' '}{m.text_me}</div> : 
        <></> }
    </div>)

    //gui tin nhan
    const Send = ()=>{
       if(token.id === targetUser.id){
           return false
       }
        if(tn.length>0 && targetUser.id>0){
            let ob = {
                id: idSocket,
                name: token.name,
                connecter_id: token.id,
                target_id: targetUser.id,
                // target_id: target,
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

    const checkOnline = (username)=>{
        if(online.map(function(e){
            return e.username;
          }).indexOf(username)>=0){
            return true
          }else{
              return false
          }
    }
    //load Messages cu
    useEffect( ()=>{
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
    },[token.id])

    //lay thong tin toan bo user inbox voi minh listInbox
    useEffect(() => {
        let mounted = true;
        UserInbox({connecter_id: token.id})
          .then(items => {
            if(mounted) {
              if(contact.id){ //tu Task di qua
                  let array = items
                  array.push(contact)
                  var pp = array.filter( (ele, ind) =>
                        ind === array.findIndex(
                        elem => elem.id === ele.id ) )
                  setListInbox(pp)
              } else{
                setListInbox(items)
              }
            }
          })
        //   console.log('contact')
        return () => mounted = false;
      }, [token.id,contact.id, contact])
    
    //connect socket io and get idSocket
    let socketRef = useRef()
    useEffect( ()=>{
        let mounted = true;
        if(mounted){
            socketRef.current = socketIOClient.connect(host)
            socketRef.current.on("getId", (data)=>{
                if(data){
                    const obSocket = {
                        username: token.username,
                        connecter_id: token.id,
                        socket_id: data
                    }
                    socketRef.current.emit("client-send-obSocket",obSocket)
                }
                setIdSocket(data)
                // console.log(data)
            })
            socketRef.current.on("online", (online)=>{
                // console.log(online)
                setOnline(online)
            })
            socketRef.current.on("mess-in", (data)=>{
                setListMess( (listMess)=>[...listMess,data])
                setNewMess( (newMess)=>[...newMess,data])
                scrollToBottom()
                console.log(listInbox)
                // if(data.connecter_id !== token.id && listInbox.map(function(e) {
                //     return e.id;
                //   }).indexOf(data.connecter_id)<0){
                //     console.log('username khong ton tai')
                //     GetUser({id: data.connecter_id}).then((item)=>{
                //         setListInbox( (listInbox)=> [...listInbox,item[0]])
                //     })
                //   }
                console.log(data.text_me)
                // scrollToBottom()
            })
        }
        return () =>  mounted = false;
    },[token.id,token.username, listInbox])

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
    },[token.id])
    
 return(
    <div className={s.homeContainer}>

        <div className={s.leftbar}>
                {/* <h4>Bên trái chat với {targetUser.id}</h4>
                { checkOnline(targetUser.username)? <h4>Online</h4>: <h4>no</h4>} */}
                {/* <input type="number" value={target} 
                onChange={(e)=>{setTarget(e.target.value)}} /> */}
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
                <button className={s.button} onClick={Send}> Gửi </button>
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
                        { checkOnline(u.username)? 
                            <span className={s.rightbarOnline}></span>
                            : <></>
                        }
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