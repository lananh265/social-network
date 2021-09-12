
// import { useState, useRef, useEffect } from "react";
// import socketIOClient, { Socket } from "socket.io-client"
// const host  = "http://localhost:4000"
// export default function Chat(){
// const [id, setId] = useState("")//id bam duoc cap boi  Server Socket
// const [tn, setTN] = useState("")//tn la noi dung tin nhan nguoi dung nhap
// const [noiDung, setNoiDung] = useState([])//noiDung la list tin nhan cu va moi

// const xuLyTN = (e)=>{
//   setTN(e.target.value)
// }//luu gia tri nguoi dung nhap vao bien tn

// const guiTN = ()=>{
//   const ob= {
//     id: id,
//     message: tn
//   }
//   socketRef.current.emit("chatAnh",ob)
//   setTN("")
// }//phat tin hieu emit cho Server xu li

// const listTN = noiDung.map ( (e, index)=>
//   <div key = {index}>
//     {e.id} {e.message}
//   </div>
// )

// let socketRef= useRef()

// useEffect( ()=>{
// const url= "http://localhost:4000/get_messages"
// fetch(url,{
//   method: "GET"
// })
// .then((data)=>data.json())
// .then( (dataJson)=>{
//   setNoiDung(dataJson)
//   // console.log(dataJson)
// })
// .catch( (e)=>{console.log(e)})

//   socketRef.current = socketIOClient.connect(host)
//   socketRef.current.on("nhanID", (data)=>{
//     setId(data)
//   })

//   socketRef.current.on("chatTy", (data)=>{
//     setNoiDung(noiDung =>[...noiDung, data])
//     //them ob moi vao noi dung tin nhan

//   })

// },[])
//   return(
//     <div>
//       <h1>Day la Chat cho id</h1>
//       {id}
//       {listTN}
//       <div>
//         <form>
//           <label>
//             <input type="text" value={tn} onChange={(e)=>{xuLyTN(e)}}/>
//           </label>
//         </form>
//         <button onClick={()=>{guiTN()}}> Send</button>
//       </div>
     
//     </div>
//   )

// }


import {useState, useRef, useEffect} from 'react'
import socketIOClient, { Socket } from "socket.io-client"
const host = "http://171.235.73.143:4000/"

export default function Chat(){
  const [id, setID] = useState("")
  const [tn, setTN] = useState ("")
  const luuTN = (e)=>{
    setTN(e.target.value)
  }
const guiTN = ()=>{
  const ob={
    id_gui:3,
    id_nhan:2,
    message: tn
  }
  socketRef.current.emit("guiTN", ob)
  
}


  let socketRef = useRef()
  useEffect( ()=>{
    socketRef.current = socketIOClient.connect(host)
    socketRef.current.on("nhanID", (data)=>{
      setID(data)
    }) 

  },[])
  return(
    <div>
      <h1>Day La Chat </h1>
      {id}
      <div>
        <form>
          <label>
            <input type="text" value={tn} onChange={(e)=>{luuTN(e)}} />
          </label>
        </form>
        <button onClick={()=>{guiTN()}}>Gui</button>
      </div>
    </div>
  )
}
