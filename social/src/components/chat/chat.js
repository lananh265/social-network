import { useState, useRef, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client"

const host ="http://localhost:4000/"
export default function Chat(){
    const [id, setId] = useState()
    const [listTN, setlistTN] = useState([{}])
    const [tn, setTN] = useState("")
    const [target_id, setTarget_ID] = useState("")

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

   
  const loadTn = listTN.map ( (e, index)=>
  <div key = {index}>
    {e.name} {e.text_me}
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
        <div>
            <div>
            <h1>Chat {id}</h1>
            <input name="name" type="radio" value="2"  onChange={(e)=>{setTarget_ID(e.target.value)}}/>Lan Anh
            <input name ="name" type="radio" value="1" onChange={(e)=>{setTarget_ID(e.target.value)}}/>Ty
            <h3>Target_id:</h3> 
            {target_id}
           {loadTn}
           </div>
            <div>
                <form>
                    <label>
                        <input type="text" value={tn} 
                        onChange={(e)=>{setTN(e.target.value)}}
                        onKeyDown={(e)=>{_handleKeyDown(e)}}/>
                    </label>
                </form>
                <button onClick={()=>{Send()}}>Gửi</button>
            </div>
        </div>
    )
}