import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import QRCode from 'qrcode.react';
import styles from '../../styles/components/dashboard/ViewOrders.module.css';

const Order = ({ order }) => {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const [packagingState, setPackagingState] = useState(false);
  const [dispatchedState, setDispatchedState] = useState(false);
  const [deliveredState, setDeliveredState] = useState(false);

  const ordernRef = doc(db, 'orders', order.id);

  useEffect(() => {
    setPackagingState(order.packaging);
    setDispatchedState(order.dispatched);
    setDeliveredState(order.delivered);
  }, []);

  const handleOnPackagingChange = async () => {
    await updateDoc(ordernRef, {
      packaging: !packagingState,
    });
    setPackagingState(!packagingState);
  };

  const hanldeOnDisptachChange = async () => {
    await updateDoc(ordernRef, {
      dispatched: !dispatchedState,
      dispatchedAt: dispatchedState === false ? currentDate : '',
    });
    setDispatchedState(!dispatchedState);
  };

  const handleOnDeliveredChange = async () => {
    await updateDoc(ordernRef, {
      delivered: !deliveredState,
      deliveredAt: deliveredState === false ? currentDate : '',
    });
    setDeliveredState(!deliveredState);
  };

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
    <tr className={styles.orderData}>
      <td style={{ color: '#800acf', fontWeight: '600' }}>{order.id}</td>
      <td>{order.name}</td>
      <td>{order.phoneNumber}</td>
      <td>{order.email}</td>
      <td>{order.petName}</td>
      <td>{order.beltType}</td>
      <td>Rs. {order.beltPrice}</td>
      <td>
        {order.orderStreetAddress} {order.orderAddressLine2} {order.orderCity}
        {order.orderPincode}
      </td>
      <td>
        <a href={`tel:${order.orderPhoneNumber}`}>{order.orderPhoneNumber}</a>
      </td>
      <td>{order.orderedAt}</td>
      <td>{order.paymentId}</td>
      <td
        className={order.packaging ? `${styles.active}` : `${styles.deactive}`}
      >
        {order.packaging ? 'Yes' : 'No'}
        <input
          type="checkbox"
          checked={packagingState}
          onChange={handleOnPackagingChange}
        />
      </td>
      <td>
        <span
          className={
            order.dispatched ? `${styles.active}` : `${styles.deactive}`
          }
        >
          {order.dispatched ? 'Yes' : 'No'}
        </span>
        <input
          type="checkbox"
          checked={dispatchedState}
          onChange={hanldeOnDisptachChange}
        />
      </td>
      <td>
        <span
          className={
            order.delivered ? `${styles.active}` : `${styles.deactive}`
          }
        >
          {order.delivered ? 'Yes' : 'No'}
        </span>
        <input
          type="checkbox"
          checked={deliveredState}
          onChange={handleOnDeliveredChange}
        />
      </td>
      <td>
        <button onClick={() => downloadQRCode(order.id)}>
          <i className="fa-solid fa-qrcode"></i>
        </button>
        <QRCode
          id="qrCodeEl"
          size={150}
          value={'https://pupfinder.vercel.app/' + order.id}
          style={{ display: 'none' }}
        />
      </td>
      <td>
        <button>
          <a href={order.image} target="_blank">
            <i className="fa-solid fa-download"></i>
          </a>
        </button>
      </td>
    </tr>
  );
};

export default Order;
