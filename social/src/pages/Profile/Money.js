import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import HistoryMoney from '../../API/HistoryMoney';
import QRCode from 'qrcode.react';
import NapTienQR from '../../API/Naptien'
import StatusQR from '../../API/StatusQR';
import RutTien from '../../API/RutTien';
// const src = "http://192.168.1.2:4000/v0.1/"

export default function Money(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  const [showQR, setShowR] = useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const [historyMoney, setHistoryMoney] = useState([{}])
  const [qr, setQR] = useState({})
  const [statusQR, setStatusQR] = useState({})

  // const checkAction = ()=>{
  //   let action = inMoney? 'inmoney?' : 'outmoney?'
  //   return src+action+'user_id='+token.id+'&coin='+coin
  // }
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
    let ob = {
        apptransid: qr.apptransid
    }
    let json = await StatusQR(ob)
    setStatusQR(json)
    //nap thanh cong update token MySQL
    if(json.returncode===1){
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
    return(
      <div>
        <h1>Đây là Money</h1>
        
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
        <p>URL: {qr.orderurl}</p>
        
        <input type="number" onChange={(e)=>{setCoin(e.target.value)}} />
        {showQR ? 
          <button onClick={()=>{setShowR(false)}} >Ẩn QR</button>:
          <button onClick={(e)=>{handleMoney(e)}}>Thực hiện</button>
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
      {/* {renderHistory} */}
      <button onClick={(e)=>checkQR(e)} >Check nạp tiền</button>
      </div>
    )
  }