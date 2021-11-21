import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import HistoryMoney from '../../API/HistoryMoney';
import QRCode from 'qrcode.react';
import NapTienQR from '../../API/Naptien'
import StatusQR from '../../API/StatusQR';
import UpdateToken from '../../API/UpdateToken';
const src = "http://192.168.1.2:4000/v0.1/"
const urlQR = "https://sbgateway.zalopay.vn/openinapp?order=eyJ6cHRyYW5zdG9rZW4iOi"+
"IyMTExMTYwMDAwMDQxOThQV3Z2MXpxIiwiYXBwaWQiOjI1NTR9"
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
        alert('Chúc mừng, bạn đã trở thành thành viên chính thức. Hãy đăng nhập lại!')
        dangXuat()
      }
    }
  }
  
    return(
      <div>
        <h1>Mời bạn nạp tiền lần đầu</h1>
        
        <ul>
          <li>Name:{accountInfor[0].name} </li>
          <li>Email: {accountInfor[0].email}</li>
          <li>SDT: {accountInfor[0].phone}</li>
          <li>Blance: {accountInfor[0].balance}$</li>
        </ul>
        <label>
          <input
            type="radio"
            value="nap"
            name="gender"
            onChange={()=>{setInMoney(true)}}
          />
          Nạp tiền
        </label>
        <label>
          <input
            type="radio"
            value="rut"
            name="gender"
            onChange={()=>{setInMoney(false)}}
          />
          Rút tiền
        </label>
        <h5>Nhập số tiền bạn muốn rút</h5>
        <h5>URL: {qr.orderurl}</h5>
        <h5>Apptransid: {qr.apptransid}</h5>
        {/* <h5>urlQR: {urlQR}</h5> */}
        <input type="number" onChange={(e)=>{setCoin(e.target.value)}} />
        {showQR ? 
          <button onClick={()=>{setShowR(false)}} >Ẩn QR</button>:
          <button onClick={(e)=>{createQR(e)}}>Quét QR</button>
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
        }
      <h3>Lịch sử tài khoản</h3>

      <button onClick={(e)=>checkQR(e)} >Check nạp tiền</button>
      {statusQR.returncode===1 ? <p>Đã nạp</p> :
       <p>Chưa nạp</p>}
      {/* {renderHistory} */}
      <button onClick={()=>{dangXuat()}}>Đăng xuất</button>
      </div>
    )
  }