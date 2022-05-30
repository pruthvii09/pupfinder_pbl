import React, { useState } from 'react';
import Belt from './Belt';
import Snackbar from '../Snackbar';
import styles from '../../styles/components/Form.module.css';

const BeltInformation = ({
  products,
  image,
  setImage,
  petName,
  setPetName,
  name,
  setName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  beltType,
  setBeltType,
  beltId,
  setBeltId,
  beltImage,
  setBeltImage,
  beltPrice,
  setBeltPrice,
  setCurrentWizard,
  handleBeltInformation,
  openSnackbar,
  setOpenSnackbar,
  message,
  setMessage,
  color,
  setColor,
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <div className={styles.profilePicker}>
          <label htmlFor="picker">
            <img src="/images/profile_picker.svg" alt="profile_picker" />
            {image ? `${image.name} uploaded.` : `Upload Dog's Photo`}
          </label>
          <input
            type="file"
            name="image-picker"
            id="picker"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <h3>Belt / QR information</h3>
        <div className={styles.field}>
          <label htmlFor="petname">Pet name</label>
          <input
            type="text"
            id="petname"
            placeholder="Enter pet name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="yourname">Your name</label>
          <input
            type="text"
            id="yourname"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="yourname">Your address</label>
          <input
            type="text"
            id="yourname"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="phonenumber">Phone number</label>
          <input
            type="text"
            id="phonenumber"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.beltsContainer}>
          <label htmlFor="petname">Belt type</label>
          <div className={styles.belts}>
            {products.map((product) => (
              <Belt
                product={product}
                beltType={beltType}
                setBeltType={setBeltType}
                setBeltId={setBeltId}
                setBeltImage={setBeltImage}
                setBeltPrice={setBeltPrice}
                key={product.id}
              />
            ))}
          </div>
        </div>
        <button onClick={handleBeltInformation}>Next</button>
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

export default BeltInformation;
