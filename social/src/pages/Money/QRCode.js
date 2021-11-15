import React from 'react';
import { useState } from 'react';
import QRCode from 'qrcode.react';
import s from "./Money.module.css"

// import { colors } from '@material-ui/core';
import GetInfor from '../../API/GetInfor';
const src = "http://192.168.1.5:4000/v0.1/" 
export default function QrCode() {
  const checkAction = ()=>{
    let action = inMoney? 'inMoney?' : 'outMoney?'
    return src + action+'user_id='+token.id+'&coin='+coin
  }
  const {token} = GetInfor()
  const [showQR, setShowQR]= useState(false)
  const [inMoney, setInMoney] = useState(false)
  const [coin, setCoin] = useState(0)
  const handleChange=(e)=>{
    e.preventDefault()
    setShowQR(!showQR)
  } 
  return (
    <div className='QrCode'>
     <button className={`${s.button}`} onClick={(e)=>handleChange(e)}>Hiện/Ẩn Mã QR</button>
     {showQR ?
     <div>
     <QRCode
        id='qrcode'
        value={checkAction()}
        size={180}
        level={'H'}
        includeMargin={true}
      />
</div>:null}  
       </div>
        
  );
}
