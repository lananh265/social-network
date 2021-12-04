import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import HistoryMoney from '../../API/HistoryMoney';
import QRCode from 'qrcode.react';
import NapTienQR from '../../API/Naptien'
import StatusQR from '../../API/StatusQR';
import RutTien from '../../API/RutTien';
import {StyledFormWrapper,StyledForm, StyledInput} 
from '../../components/css/cssform';
import s from "./Ruttien.module.css"
const src = "http://localhost:4000/v0.1/"

export default function RutTien2(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  const [showQR, setShowR] = useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const [historyMoney, setHistoryMoney] = useState([{}])
  const [qr, setQR] = useState({})
  const [statusQR, setStatusQR] = useState({})

  const checkAction = ()=>{
    let action = inMoney? 'inmoney?' : 'outmoney?'
    return src+action+'user_id='+token.id+'&coin='+coin
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
  useEffect( ()=>{
    let mounted = true
    const ob = {
      user_id: token.id
    }
    HistoryMoney(ob).then( (json)=>{
      if(mounted){
        setHistoryMoney(json)
        console.log(json)
      }
    })
    return ()=> mounted = false
  },[])

  const renderHistory = historyMoney.map( (e,index)=>{
    return(<div key={index}>
      {e.date_tra} 
      <br/>
      {token.name} {e.text} {e.name} {e.coin}
    </div>)
  })

  const createQR = async(e)=>{
    e.preventDefault();
    if(!coin){
      return alert('bạn phải nhập số tiền')
    }
    let ob = {
        coin : coin,
        description: 'nạp coin vào hệ thống'
    }
    let json = await NapTienQR(ob)
    console.log(json)
    setQR(json)
    setShowR(true)

    let obcheck = {
        "apptransid": json.apptransid
    }
    let check = await StatusQR(obcheck)
    setStatusQR(check)
  }
  const checkQR = async(e)=>{
    e.preventDefault();
    
    alert('Yêu cầu rút tiền của bạn sẽ được admin giải quyết !')
    
  }
  const outMoney = async(e)=>{
    e.preventDefault()
    if(!coin){
      return alert('bạn phải nhập số tiền')
    }
    let obMoney = {
      user_id: token.id,
      coin: coin,
      zptransid: token.zptransid
    }
    let result = await RutTien(obMoney)
    console.log(result)
    if(result.status){
      alert("Rút thành công")
    }else{
      alert(result.code)
    }
  }
  const handleMoney = async(e)=>{
     e.preventDefault()
     alert("Yêu cầu của bạn sẽ được admin xử lý")
  }
    return(
      <div>
        <StyledFormWrapper>
        <StyledForm>        
        <ul>
        <h3><b>Xin chào, &nbsp;{accountInfor[0].name}</b></h3><hr/>
        <h5>Thông Tin Tài Khoản</h5>
          <li><b>Họ tên:</b>&ensp;{accountInfor[0].name} </li>
          <li><b>Email:</b>&ensp;{accountInfor[0].email}</li>
          <li><b>SĐT:</b>&ensp;{accountInfor[0].phone}</li>
          <li><b>Số dư khả dụng:</b>&ensp;{accountInfor[0].balance} VNĐ</li>
        </ul><hr/>
        <h4 style={{color:"#3b8d99",textAlign: "center",}}><b>Thực Hiện Rút Tiền</b></h4>
       <br/> 
       <h6 style={{  
                   textAlign: "left", 
                  }}>Nhập số tiền bạn cần:</h6>
      <StyledInput
     type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>
     <button  className={`${s.button}`} onClick={(e)=>{handleMoney(e)}}>Thực hiện</button><hr/>

<h4  style={{ color: "#3b8d99",  textAlign: "center", }}>
       <marquee direction="up" scrollamount="2">
        Thanh toán an toàn&ndash;Bảo mật tuyệt đối</marquee></h4><hr/>
      <h3>Lịch sử giao dịch</h3> 
      {/* {renderHistory} */}
      </StyledForm>
      </StyledFormWrapper>
      </div>
    )
  }