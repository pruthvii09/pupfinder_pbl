import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import styles from '../styles/components/Form.module.css';

const Donate = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const handleDonateNow = async () => {
    if (
      name.length <= 0 ||
      phoneNumber.length <= 0 ||
      email.length <= 0 ||
      amount.length <= 0
    ) {
      setMessage('Please enter all the details');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else {
      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
        amount: parseInt(amount) * 100,
        currency: 'INR',
        name: 'pupfinder',
        description: 'pupfinder payment gateway',
        handler: function (response) {
          const donationCollectionRef = collection(db, 'donations');
          addDoc(donationCollectionRef, {
            paymentId: response.razorpay_payment_id,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            amount: amount,
          });
          navigate('/all-donations');
        },
        preFill: {
          name: name,
          email: email,
          contact: phoneNumber,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#800acf',
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h1>Donate now</h1>
        <div className={styles.field}>
          <label htmlFor="name">Enter name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="email">Enter email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">Enter amount</label>
          <input
            type="text"
            id="amount"
            placeholder="Enter amount in Rs."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={handleDonateNow}>
          Donate now <i className="fa-solid fa-circle-dollar-to-slot"></i>
        </button>

        <p>
          See our donors
          <span onClick={() => navigate('/all-donations')}>Click here</span>
        </p>
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

export default Donate;
