import React from 'react';
import { useState } from 'react';
import QRCode from 'qrcode.react';
import { colors } from '@material-ui/core';

export default function QrCode() {
  const [showQR, setShowQR] = useState(true)  
  const handleChange=(e)=>{
    e.preventDefault()
    setShowQR(!showQR)
  }
  return (
    <div className='QrCode'>
      <button onClick={(e)=>handleChange(e)}>Hiện/Ẩn Mã QR</button>
      {showQR? <QRCode
            id='qrcode'
            value='https://30000'
            size={190}
            level={'H'}
            includeMargin={true}
          /> : null}

      

       </div>
        
  );
}
