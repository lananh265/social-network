import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import QRCode from 'qrcode.react';
import NapTienQR from '../../API/Naptien'
import StatusQR from '../../API/StatusQR';
import {StyledFormWrapper,StyledForm, StyledInput} from '../../components/css/cssform';
import s from "./Money.module.css"
import HistoryMoney from '../../API/HistoryMoney'; 
import RutTien from '../../API/RutTien';
const src = "http://192.168.1.5:4000/v0.1/" 
// const urlQR = "https://sbgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOi"+
// "IyMTExMTYwMDAwMDQxOThQV3Z2MXpxIiwiYXBwaWQiOjI1NTR9"
export default function Money(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  const [showQR, setShowR]= useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const [historyMoney, setHistoryMoney] = useState([{}])
  // const [apptransid, setApptransid] = useState('')
  // const [zptransid, setZptransid] = useState('')
  const [qr, setQR] = useState({})
  const [statusQR, setStatusQR] = useState({})
  const checkAction = ()=>{
    let action = inMoney? 'inmoney?' : 'outmoney?'
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
      return alert('Bạn phải nhập số tiền!')
    }
    let ob = {
        coin : coin,
        description: 'Nạp tiền thành viên'
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
    let ob = {
        apptransid: qr.apptransid
    }
    let json = await StatusQR(ob)
    setStatusQR(json)
    //nap thanh cong update token MySQL
    if(json.returncode===1){
      let urlGet = checkAction()
      console.log(urlGet)
      fetch(urlGet, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert('Nạp tiền thành công hãy kiểm tra lại tài khoản!')
    }
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
    inMoney? createQR(e) : outMoney(e)
 }


  // const [showHis, setShowHis]= useState(false)
  // const handleChange=(e)=>{
  //   e.preventDefault()
  //   setShowHis(!showHis)
  // } 
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
     onChange={()=>{setInMoney(true)}}
    />
</label>
&emsp;&emsp;
<label><h6><b>Rút tiền</b></h6>
    <StyledInput
      style={{ width:"24px", height:"17px",}}
      type="radio"
      value="rut"
      name="tien"
      onChange={()=>{setInMoney(false)}}
    />
    </label>
    <br/>
<b>URL:</b> {qr.orderurl}
   <br/>
{/* <b>Apptransid:</b> {qr.apptransid}
<br/><br/> */}
    <h6 style={{  
                   textAlign: "left", 
                  }}>Nhập số tiền bạn cần:</h6>
      <StyledInput
     type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>

     <h4  style={{ color: "#3b8d99", textAlign:"center"}}>
       
        Thanh toán an toàn&ndash;Bảo mật tuyệt đối</h4><hr/>
        <div style={{ color: "#3b8d99",textAlign: "center",}}>
        {showQR ? 
          <button className={`${s.button}`} onClick={()=>{setShowR(false)}} >Ẩn Mã QR</button>:
          <button className={`${s.button}`} onClick={(e)=>{handleMoney(e)}}>Thực hiện</button>
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
   <h4 style={{color: "#3b8d99",}}>Lịch sử giao dịch</h4>
   <button onClick={(e)=>checkQR(e)} >Kiểm Tra Giao Dịch</button>

   {/* <button className={`${s.buttonHis}`} onClick={(e)=>handleChange(e)}>Lịch sử giao dịch của bạn</button>
   {showHis ?
    <div>{renderHistory}</div>:null} */}
</StyledForm>
</StyledFormWrapper>
</div>
    )
  }