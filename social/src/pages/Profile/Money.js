import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import HistoryMoney from '../../API/HistoryMoney';
import QRCode from 'qrcode.react';
const src = "http://192.168.1.2:4000/v0.1/"
export default function Money(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  const [showQR, setShowR] = useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const [historyMoney, setHistoryMoney] = useState([{}])
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
    <div>

    </div>
  })
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
        <h5>URL: {checkAction()}</h5>
        <input type="number" onChange={(e)=>{setCoin(e.target.value)}} />
        {showQR ? 
          <button onClick={()=>{setShowR(false)}} >Ẩn QR</button>:
          <button onClick={()=>{setShowR(true)}}>Quét QR</button>
        }

        { showQR ?
          <div>
          <QRCode
              id='qrcode'
              value={checkAction()}
              size={200}
              level={'H'}
              includeMargin={true}
          />
          </div> :
          null
        }
      <h3>Lịch sử tài khoản</h3>
      </div>
    )
  }