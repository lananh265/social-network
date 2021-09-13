

import {useState, useEffect, useRef } from 'react'
import socketIOClient from "socket.io-client"

export default function Chat(){

    const [luuID, setLuuID]= useState("")
    const [tn, setTN] = useState("")

    const xuLyTN = (e)=>{
    setTN(e.target.value)}

    let socketRef = useRef()
    useEffect ( ()=>{
        socketRef.current = socketIOClient.connect("http://philongit.ddns.net:4000/")
        socketRef.current.on ("capID", (id)=>{
            setLuuID(id)
        })
    },[])
  return(
    <div>
      <h1>Đây là Chat cua ID: </h1>
      {luuID}
      <h3>{tn}</h3>
      <div>
          <form>
              <label>
                  <input type="text"  onChange={(e)=>{xuLyTN(e)}}/>
              </label>
          </form>
          <button>Gui</button>
      </div>
     
    </div>
  )
}