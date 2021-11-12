import React, {useEffect, useState} from 'react';
import AccountInfor from '../../API/AccountInfor';
import GetInfor from '../../API/GetInfor';
import QRCode from 'qrcode.react';

const src = "http://192.168.1.5:4000/v0.1/" 
export default function Money(){
  const [accountInfor, setAccountInfor] = useState([{}])
  const {token} = GetInfor()
  const [showQR, setShowQR]= useState(false)
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
        <h1>Đây là Money</h1>
        <ul>
          <li>Name:{accountInfor[0].name} </li>
          <li>Email: {accountInfor[0].email}</li>
          <li>SDT: {accountInfor[0].phone}</li>
          <li>Blance: {accountInfor[0].balance}</li>
        </ul>
                 <label>
                    <input
                      type="radio"
                      value="nap"
                      name="tien"
                      onChange={()=>setInMoney(true)}
                    />
                    Nạp tiền
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="rut"
                      name="tien"
                      onChange={()=>setInMoney(false)}
                    />
                    Rút tiền
                  </label>
                  <h6>Nhập số tiền bạn muốn rút:</h6>
                  <h6>URL: {checkAction()}</h6>
                  <input type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>
                  {showQR ?
                  <button onClick={()=>{setShowQR(false)}}>Ẩn mã QR</button>:
                  <button onClick={()=>{setShowQR(true)}}>Quét mã QR</button>
                  }
                  {showQR ?
                  <div>
                  <QRCode
            id='qrcode'
            value={checkAction()}
            size={190}
            level={'H'}
            includeMargin={true}
          />
             </div>:null}     

      </div>
    )
  }