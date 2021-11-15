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
        <StyledFormWrapper>
        <StyledForm>
        <ul>
        <h3><b>Xin chào, &nbsp;{accountInfor[0].name}</b></h3><hr/>
          <h5>Thông Tin Tài Khoản</h5>
            <li><b>Họ tên:</b>&ensp;{accountInfor[0].name} </li>
            <li><b>Email:</b>&ensp;{accountInfor[0].email}</li>
            <li><b>SĐt:</b>&ensp;{accountInfor[0].phone}</li>
            <li><b>Số dư khả dụng:</b>&ensp;{accountInfor[0].balance} VNĐ</li>
        </ul><hr/>
        <h4 style={{color:"#3b8d99",textAlign: "center",}}><b>Thực Hiện Giao Dịch</b></h4>
       <br/> <label><h6>Chọn hình thức thực hiện:</h6></label>&emsp;&emsp;
        <label> <h6><b>Nạp tiền</b></h6>
    <StyledInput 
     style={{ width:"24px", height:"17px",}}
     type="radio"
     value="nap"
     name="tien"
     onChange={()=>setInMoney(true)}
    />
</label>
&emsp;&emsp;
<label><h6><b>Rút tiền</b></h6>
    <StyledInput
      style={{ width:"24px", height:"17px",}}
      type="radio"
      value="rut"
      name="tien"
      onChange={()=>setInMoney(false)}
    />
    </label>
 <h6 style={{textAlign: "center",}}><b>URL: {checkAction()}</b></h6>
   <br/>
    <h6 style={{  
                   textAlign: "left", 
                  }}>Nhập số tiền bạn cần:</h6>
      <StyledInput
     type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>

     <h4  style={{ color: "#3b8d99",}}>
       <marquee behavior="alternate">
        Thanh toán an toàn&ndash;Bảo mật tuyệt đối</marquee></h4>
   <div className={`${s.giua}`}><QRCode /></div>
</StyledForm>
</StyledFormWrapper>

      </div>
    )
  }