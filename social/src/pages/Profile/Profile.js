import {useState, useEffect} from "react"
import "./profile.css"
import Progress from "../../components/progress/Progress";
import Transfer from "../../API/Transfer";
import NapTien from "./Naptien";
import RutTien2 from "./RutTien";
import Duyet from "./Duyet";
export default function Profile(){
  const [counter, setCounter] = useState(90);
  const [start, setStart] = useState(false)
  
  
  useEffect(() => {
    if(start){
      counter < 90 && setTimeout(() => setCounter(counter + 10), 400);
    }
  }, [counter,start]);

  const transfer = async(e)=>{
    e.preventDefault();
    let obTransfer =  {
      connecter_id: 1,
      target_id: 2,
      coin: 20
   }
   setStart(true)
   let json = await Transfer(obTransfer)
   
   console.log(json)
   if(json.status){
    setCounter(100)
    alert(json.code)
    }else{
   alert(json.code)
   }
 
  }
    return(
      <div>
        {/* <h4>Trang Profile</h4>
        {counter}
        <Progress done={counter}/>
        <button onClick={()=>setStart(true)}>Tăng dần</button>
        <button onClick={()=>setCounter(100)}>Full</button>
        <button onClick={()=>{setStart(false); setCounter(0)}}>Null</button>
        <button onClick={(e)=>{ transfer(e)}}>Hoàn Thành</button> */}
        {/* <NapTien/> */}

        {/* <RutTien2/>  */}
        <Duyet/>
      </div>
    )
  }