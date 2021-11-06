import React from 'react';

import QRCode from 'qrcode.react';

export default function QRCode() {
  return (
    <div className='QrCode'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
          <QRCode
            id='qrcode'
            value='https://viblo.asia/u/tranchien'
            size={290}
            level={'H'}
            includeMargin={true}
          />
        </div>
      </header>
    </div>
  );
}
