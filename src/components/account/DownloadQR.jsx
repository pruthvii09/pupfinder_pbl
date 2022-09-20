import React from 'react';
import QRCode from 'qrcode.react';
import styles from '../../styles/components/account/PostedDog.module.css';

const DownloadQR = ({ freeOrder }) => {
  const downloadQRCode = (id) => {
    const qrCodeURL = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png ')
      .replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = `${id}.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <div>
      <div className={styles.container}>
        <img src={freeOrder?.image} alt={`${freeOrder?.id}_image`} />
        <div className={styles.information}>
          <h5>{freeOrder?.petName}</h5>
          <p>{freeOrder?.phoneNumber}</p>
          <p>{freeOrder?.email}</p>
          <p>{freeOrder?.address}</p>
        </div>
        <button
          style={{ width: 230, fontSize: 14, padding: 0 }}
          onClick={() => downloadQRCode(freeOrder?.id)}
        >
          Download QR
          <i
            className="fa-solid fa-qrcode"
            style={{ marginLeft: 5, fontSize: 14 }}
          ></i>
        </button>
      </div>

      <QRCode
        id="qrCodeEl"
        size={150}
        value={'https://pupfinder.vercel.app/' + freeOrder.id}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DownloadQR;
