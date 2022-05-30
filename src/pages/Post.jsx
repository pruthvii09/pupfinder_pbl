import React, { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { actionTypes, useStateValue } from '../store';
import Snackbar from '../components/Snackbar';
import styles from '../styles/components/Form.module.css';

const Post = () => {
  const [{ uid }, dispatch] = useStateValue();

  const options = ['Aurangabad', 'Pune', 'Mumbai', 'Jalna', 'Beed', 'Latur'];

  const [image, setImage] = useState('');
  const [breed, setBreed] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('Aurangabad');
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState('');
  const [otp, setOtp] = useState('');

  const [showOtpField, setShowOtpField] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {},
      },
      auth
    );
  };

  const sendOTP = async () => {
    if (breed.length <= 0) {
      setMessage('Please enter all the details');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else if (image.length <= 0) {
      setMessage('Please upload image of dog.');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else if (phoneNumber.length !== 10) {
      setMessage('Phone number must be exactly 10 digits long.');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else {
      generateRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      await signInWithPhoneNumber(auth, `+91 ${phoneNumber}`, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setShowOtpField(true);
        })
        .catch((error) => {
          setMessage('Opps. Something went wrong, Please try again. :(');
          setColor('#d7082b');
          setOpenSnackbar(true);
        });
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setMessage('OTP must be exactly 6 digits long.');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else {
      let confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          console.log(user);

          //upload image
          const imageRef = ref(storage, 'images/adoptions/' + image.name);
          uploadBytesResumable(imageRef, image)
            .then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                // store data
                const adoptionsCollectionRef = collection(db, 'adoptions');
                addDoc(adoptionsCollectionRef, {
                  id: user.uid,
                  image: url,
                  breed: breed,
                  phoneNumber: phoneNumber,
                  address: address,
                  city: city,
                });
              });
            })
            .catch((error) => {
              setMessage('Opps. Something went wrong, Please try again. :(');
              setColor('#d7082b');
              setOpenSnackbar(true);
            });

          dispatch({ type: actionTypes.SET_UID, uid: user.uid });
        })
        .catch((error) => {
          setMessage('OTP you have entered is incorrect. Please try again.');
          setColor('#d7082b');
          setOpenSnackbar(true);
        });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h1>Post Dog</h1>

        {showOtpField ? (
          <>
            <span>
              OTP has been sent successfullt to
              <strong> {`+91 ${phoneNumber}`}</strong>
            </span>
            <div className={styles.field}>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button onClick={verifyOTP}>Submit</button>
          </>
        ) : (
          <>
            <div className={styles.profilePicker}>
              <img src="/images/profile_picker.svg" alt="profile_picker" />
              <input
                type="file"
                name="image-picker"
                id="picker"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label htmlFor="picker">
                {image ? `${image.name} uploaded` : `Upload Dog's Photo`}
              </label>
            </div>
            <div className={styles.field}>
              <label htmlFor="breed">Dogs breed</label>
              <input
                type="text"
                id="breed"
                placeholder="Enter breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
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
              <label htmlFor="address">Street address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter current address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <select onChange={(e) => setCity(e.target.value)} id="city">
                {options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={sendOTP}>Get OTP</button>
          </>
        )}
      </div>
      <div id="recaptcha-container"></div>

      <Snackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        message={message}
        color={color}
      />
    </div>
  );
};

export default Post;
