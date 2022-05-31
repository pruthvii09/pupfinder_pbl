import React from 'react';
import Snackbar from '../Snackbar';
import styles from '../../styles/components/Form.module.css';
import Loader from '../Loader';

const OrderInformation = ({
  options,
  orderStreetAddress,
  setOrderStreetAddress,
  orderAddressLine2,
  setOrderAddressLine2,
  setOrderCity,
  orderPincode,
  setOrderPincode,
  orderPhoneNumber,
  setOrderPhoneNumber,
  setCurrentWizard,
  handleOrderInformation,
  openSnackbar,
  setOpenSnackbar,
  message,
  setMessage,
  color,
  setColor,
  loading,
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h3>Order information</h3>
        <div className={styles.field}>
          <label htmlFor="streetaddress">Street address</label>
          <input
            type="text"
            id="streetaddress"
            placeholder="Street address"
            value={orderStreetAddress}
            onChange={(e) => setOrderStreetAddress(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="addressline2">Address line 2</label>
          <input
            type="text"
            id="addressline2"
            placeholder="Address line 2"
            value={orderAddressLine2}
            onChange={(e) => setOrderAddressLine2(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="city">City</label>
          <select onChange={(e) => setOrderCity(e.target.value)} id="city">
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="pincode">Pin code</label>
          <input
            type="text"
            id="pincode"
            placeholder="Pin code"
            value={orderPincode}
            onChange={(e) => setOrderPincode(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="orderphonenumber">Order phone number</label>
          <input
            type="text"
            id="orderphonenumber"
            placeholder="Enter phone number"
            value={orderPhoneNumber}
            onChange={(e) => setOrderPhoneNumber(e.target.value)}
          />
        </div>
        <button onClick={handleOrderInformation} disabled={loading}>
          {loading ? (
            <Loader />
          ) : (
            <>
              Proceed with the payment{' '}
              <i className="fa-solid fa-credit-card"></i>
            </>
          )}
        </button>
        <button style={{ marginTop: 0 }} onClick={() => setCurrentWizard('1')}>
          Previous
        </button>
      </div>

      <Snackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        message={message}
        color={color}
      />
    </div>
  );
};

export default OrderInformation;
