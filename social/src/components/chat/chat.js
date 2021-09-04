import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import s from "./chat.module.css";

const host="http://localhost:4000/";
export default function Chat(){
    const [mess, setMess]= useState([]);
    const [message, setMessage] = useState('');
    const[id, setId] = useState();
    const socketRef = useRef();
    const sendMessage = ()=>{
        if(message !==null){
            const msg = {
                content:message,
                id:id
            }
            socketRef.current.emit('sendDataClient',msg)
            setMessage("")
        }

    }

    const renderMess = mess.map((m,index)=>{
        return(
            <div
                key={index}
                className = {`${m.id ===id ? 'your':'other'}chatitem`}>
                {m.content}
            </div>
        )
    }
    )
    const handleChange = (e)=>{
        setMessage(e.target.value)
    }
    const onEnterPress = (e)=>{
        if(e.keyCode== 13 && e.shiftKey == false){
            sendMessage()
        }
    }
    useEffect(()=>{
        socketRef.current=socketIOClient.connect(host)

        socketRef.current.on('getId', data =>{
            setId(data)
        })//phan nay gan Id cho moi lan ket noi
        socketRef.current.on('sendDataServer', dataGot =>{
            setMess(oldMsgs => [...oldMsgs, dataGot.data])
        })//moi khi tn thi mess se duoc render them
        return ()=>{
            socketRef.current.disconnect();
        };
    },[])
    return(
        <div className="">
            <h1>Day la Chat RealTime</h1>
            <div className="">
                {/* phan nay ho tin nhan */}
                {renderMess}

            </div>
            <div className="">
                <textarea
                value={message}
                onKeyDown={onEnterPress}
                onChange={handleChange}
                placeholder="Nhap tin nhan ..."
                />
                <button>Send</button>
            </div>
        </div>
    )

}