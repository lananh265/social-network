import { useState, useRef, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client"
const host ="http://localhost:4000/"

export default function Chat(){
    const [id, setId] = useState()
    const [listTN, setlistTN] = useState([{}])
    const [tn, setTN] = useState("")

    let socketRef = useRef()
    const [connecter_id, setConnecter_ID] = useState("1")//lanh
    const [target_id, setTarget_ID] = useState("2")//ty

    const Send = ()=>{
        let ob = {
            connecter_id: connecter_id ,
            target_id: target_id,
            tn: tn
        }
        socketRef.current.emit("mess-out",ob) //kenh chat: messout
        setTN("")
    }

   
  const loadTn = listTN.map ( (e, index)=>
  <div key = {index}>
    {e.connecter_id} {e.target_id} {e.tn}
  </div>
)

    useEffect( ()=>{
        socketRef.current = socketIOClient.connect(host)
        socketRef.current.on("getId",(data)=>{
            setId(data)
        })
        socketRef.current.on("mess-in", (data)=>{
            setlistTN((listTN)=> [...listTN,data])
           
        })
    }, [])
    return(
        <div>
            <h1>Chat {id}</h1>
           {loadTn}
            <div>
                <form>
                    <label>
                        <input type="text" value={tn} onChange={(e)=>{setTN(e.target.value)}} />
                    </label>
                </form>
                <button onClick={()=>{Send()}}>Send</button>
                
            </div>
        </div>
    )
}