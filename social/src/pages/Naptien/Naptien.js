import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import HistoryMoney from '../../API/HistoryMoney';
import QRCode from 'qrcode.react';
import NapTienQR from '../../API/Naptien'
import StatusQR from '../../API/StatusQR';
import s from "./Naptien.module.css"
import UpdateToken from '../../API/UpdateToken';
import {StyledFormWrapper,StyledForm, StyledInput} from '../../components/css/cssform';
import { GlobalStyle } from "../../components/css/cssformHome";
const src = "hhttps://momofree.apimienphi.com/api/QRCode?phone=01214964817&amount=1000&note="

export default function NapTien(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  const [showQR, setShowR] = useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const [historyMoney, setHistoryMoney] = useState([{}])

  const [apptransid, setApptransid] = useState('')
  const [zptransid, setZptransid] = useState('')
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
        // console.log(json)
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
    let ob = {
        coin : coin,
        description: 'nạp tiền thành viên'
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
  const dangXuat = ()=>{
    localStorage.removeItem("token")
    window.location.href = "/";
  }
  const checkQR = async(e)=>{
    e.preventDefault();
    let ob = {
        "apptransid": qr.apptransid
    }
    let json = await StatusQR(ob)
    setStatusQR(json)
    //nap thanh cong update token MySQL
    if(json.returncode===1){
      let obToken = {
        user_id: token.id,
        apptransid: qr.apptransid,
        zptransid: json.zptransid
      }
      let updatetoken = await UpdateToken(obToken)
      if(updatetoken.status===1){
        alert('Chào mừng bạn đã trở thành thành viên chính thức của LANA.VN!' +
        'Vui lòng đăng nhập lại để sử dụng trang web!')
        dangXuat()
      }
    }
  }
  
  const qrMomo= async(e)=>{
    e.preventDefault()
    let ob={
      orderurl:src + coin
    }
    setQR(ob);
    setShowR(true);
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
        <h4 style={{color:"#3b8d99",textAlign: "center",}}><b>Thực Hiện Nạp Tiền</b></h4>
       <br/> <label><h6>Chọn phương thức thực hiện:</h6></label>&emsp;&emsp;
       <label> <h6 style={{textAlign:"center"}}><b>Nạp tiền</b></h6>
       <StyledInput 
     style={{ width:"24px", height:"17px",}}
     type="radio"
     value="nap"
     name="tien"
     onChange={()=>{setInMoney(true)}}
    /></label>
<br/>
    <b>URL:</b> {qr.orderurl}
   <br/>
        {/* <h5>URL: {qr.orderurl}</h5> */}
        
    <b>Apptransid:</b> {qr.apptransid}
        {/* <h5>Apptransid: {qr.apptransid}</h5> */}
        {/* <h5>urlQR: {urlQR}</h5> */}
        <br/><br/>
    <h6 style={{  
                   textAlign: "left", 
                  }}>Nhập số tiền bạn cần:</h6>
      <StyledInput
     type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>

        {/* <input type="number" onChange={(e)=>{setCoin(e.target.value)}} /> */}
        <div style={{ color: "#3b8d99",textAlign: "center",}}>
        {showQR ? 
          <button className={`${s.button}`}onClick={()=>{setShowR(false)}} >Ẩn Mã QR</button>:
          <button className={`${s.button}`} onClick={(e)=>{qrMomo(e)}}>Quét Mã QR</button>
        }

        { showQR ?
          <div>
          <QRCode
              id='qrcode'
              value={qr.orderurl}
              size={200}
              level={'H'}
              includeMargin={true}
          />
          </div> :
          null
        }</div><hr/>
        <h4  style={{ color: "#3b8d99",  textAlign: "center", }}>
       <marquee direction="up" scrollamount="2">
        Thanh toán an toàn&ndash;Bảo mật tuyệt đối</marquee></h4><hr/>
      <h3>Lịch sử tài khoản</h3>

      <button className={`${s.buttonHis}`} onClick={(e)=>checkQR(e)} >Trạng Thái Giao Dịch</button>
      {statusQR.returncode===1 ? <p><b>Đã nạp</b></p> :
       <p><b>Chưa nạp</b></p>}
      {/* {renderHistory} */}
      </StyledForm>
      </StyledFormWrapper>
      </div>
    )
  }