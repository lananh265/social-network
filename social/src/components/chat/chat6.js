import {useEffect, useState, useRef} from "react"
import socketIOClient from 'socket.io-client'

const serVerSocKet = "http://philongit.ddns.net:4000/"


export default function Chat(){
  const [luuID, setLuuID] =useState("")
  const [tn, setTN] = useState("")

  const [connecter_id, setConnecter_ID] = useState("3")
  const [target_id, setTarget_ID] = useState("2")

  const [luuJson, setLuuJson] = useState([{}])

  const luuTN = (e)=>{
    setTN(e.target.value)
  }
  const guiTN = ()=>{
      const ob = {
          connecter_id: connecter_id,
          target_id: target_id,
          message: tn
      }
      socketRef.current.emit("chatVui",ob)
      setTN("")
  }

  const listTN = luuJson.map ( (e, index)=>
    <div key = {index}>
      {e.connecter_id} {e.target_id} {e.message}
    </div>
  )

  let socketRef = useRef()
  useEffect( ()=>{
    socketRef.current = socketIOClient.connect(serVerSocKet)
    socketRef.current.on ("nhanID", (id)=>{
      setLuuID(id)
    })
    socketRef.current.on("nhanTN", (data)=>{
        setLuuJson( (luuJson)=>[...luuJson,data])
        console.log(luuJson[0])
    })
    
  },[])

  return(
    <div>
      <h1>Chat nua ne! tu {luuID}</h1>
      {listTN}
      
      <form>
          <label>
              <input type="text" value={tn} onChange={(e)=>{luuTN(e)}} />
          </label>
      </form>
      <button onClick={()=>{guiTN()}}>GUI</button>
    </div>
  )
}