import {useEffect, useState, useRef} from "react"
import socketIOClient from 'socket.io-client'

const serVerSocKet = "http://philongit.ddns.net:4000/"


export default function Chat(){
  const [luuID, setLuuID] =useState("")
  let socketRef = useRef()
  useEffect( ()=>{
    socketRef.current = socketIOClient.connect(serVerSocKet)
    socketRef.current.on ("nhanID", (id)=>{
      setLuuID(id)
    })
    
  },[])

  return(
    <div>
      <h1>Chat nua ne!</h1>
      {luuID}
    </div>
  )
}