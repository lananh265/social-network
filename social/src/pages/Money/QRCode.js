import React from 'react';
import { useState } from 'react';
import QRCode from 'qrcode.react';
import { colors } from '@material-ui/core';


export default function QrCode({naptien}) {
  const [showQR, setShowQR] = useState(true)  
  const handleChange=(e)=>{
    e.preventDefault()
    setShowQR(!showQR)
  }
 
  const url = "http://" 
  const host = url + naptien
  return (
    <div className='QrCode'>
      <button onClick={(e)=>handleChange(e)}>Hiện/Ẩn Mã QR</button>
      {showQR? <QRCode
            id='qrcode'
            value={host}
            size={190}
            level={'H'}
            includeMargin={true}
          /> : null}

      

       </div>
        
  );
}
