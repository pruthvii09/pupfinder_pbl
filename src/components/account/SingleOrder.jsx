import React from 'react';
import styles from '../../styles/components/account/SingleOrder.module.css';

const SingleOrder = ({ order }) => {
  return (
    <div className={styles.singleOrder}>
      <img src={order?.beltImage} alt={`${order?.name}_image`} />
      <div className={styles.information}>
        <p>
          Rs. <strong>{order?.beltPrice}</strong>
        </p>
        <p>
          {`${order?.orderStreetAddress} ${order?.orderCity} ${order?.orderPincode}`}
          <i className="fa-solid fa-road"></i>
        </p>
        <p>
          {order?.orderPhoneNumber} <i className="fa-solid fa-phone"></i>
        </p>
        <p>
          Ordered on:&nbsp;
          <span style={{ color: '#333' }}>{order?.orderedAt}</span>
        </p>

        {order?.dispatched ? (
          <p>
            Dispatched:
            <span className={order?.dispatched && styles.active}>
              {order?.dispatchedAt}
            </span>
          </p>
        ) : (
          <p>
            Dispatched:
            <span>{order?.dispatched ? 'Yes' : 'No'}</span>
          </p>
        )}
        {order?.delivered ? (
          <p>
            Delivered:{' '}
            <span className={order?.delivered && styles.active}>
              {order?.deliveredAt}
            </span>
          </p>
        ) : (
          <p>
            Delivered: <span>{order?.delivered ? 'Yes' : 'No'}</span>
          </p>
        )}
      </div>
      <button>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default SingleOrder;
