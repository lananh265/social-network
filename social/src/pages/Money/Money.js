import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import QRCode from "./QRCode";
import {StyledFormWrapper,StyledForm, StyledInput} from '../../components/css/cssform';
import s from "./Money.module.css"
const src = "http://192.168.1.5:4000/v0.1/" 
export default function Money(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  // const [showQR, setShowQR]= useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const checkAction = ()=>{
    let action = inMoney? 'inMoney?' : 'outMoney?'
    return src + action+'user_id='+token.id+'&coin='+coin
  }
  useEffect( ()=>{
    let mounted = true
    const ob = {
      user_id: token.id
    }
    AccountInfor(ob).then( (json)=>{
      if(mounted){
        setAccountInfor(json)
        console.log(json)
      }
    })
    return ()=> mounted = false
  },[])

    return(
      <div>
        <h2>Đây là Money</h2>
        <StyledFormWrapper>
        <StyledForm>
        <ul>
          <li><b>Họ tên:</b>&ensp;{accountInfor[0].name} </li>
          <li><b>Email:</b>&ensp;{accountInfor[0].email}</li>
          <li><b>SĐt:</b>&ensp;{accountInfor[0].phone}</li>
          <li><b>Số dư khả dụng:</b>&ensp;{accountInfor[0].balance} VNĐ</li>
        </ul>
        <label> 
    <StyledInput className={`${s.rad}`}
     type="radio"
     value="nap"
     name="tien"
     onChange={()=>setInMoney(true)}
    /><h6 style={{ color:"#EE0000"}}>Nạp tiền</h6>
</label>
&emsp;
<label>
    <StyledInput className={`${s.rad}`}
      type="radio"
      value="rut"
      name="tien"
      onChange={()=>setInMoney(false)}
    /><h6 style={{ color:"#EE0000"}}>Rút tiền</h6>
    </label>&emsp;
   <label> <h6>URL: {checkAction()}</h6></label>
    <h4 style={{ color:"#EE0000", 
                   textAlign: "center", 
                  }}>Nhập số tiền bạn cần:</h4>
      <StyledInput
     type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>
     <QRCode />
</StyledForm>
</StyledFormWrapper>

      </div>
    )
  }