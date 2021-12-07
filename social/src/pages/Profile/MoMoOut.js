
import { useState, useEffect } from "react"
import ListCashOut from "../../API/ListCashOut"
import Transfer from "../../API/Transer"
export default function MoMoOut(){
    const [cashOut, setCashOut] = useState([{}])

    const getCashOut = async()=>{
        ListCashOut()
        .then(items=>{
            console.log(items)
            setCashOut(items)
        })
    }
    useEffect(()=>{
        let mounted = true;
        if(mounted){
            getCashOut()
        }
      return () => mounted = false
    },[])
    
    const sendMoMo = async(p,user_id)=>{
        p.prevenDefault()
        let obMoMo = {
            user_id: user_id
        }
        let result = await Transfer(obMoMo)
        console.log(result)
        getCashOut()
    }
    const listCashOut = cashOut.map( (e,index)=>{
        return(<div key={index}>
          {e.id} {e.name} {e.phone} {e.cashout} 
          <button onClick={(p)=>sendMoMo(p, e.id)}>Duyệt</button>
        </div>)
      })

    return(
        <div>
            <h5>List danh sách rút tiền</h5>
            {listCashOut}
        </div>

    )
}