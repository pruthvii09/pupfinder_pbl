import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { actionTypes, useStateValue } from '../store';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import styles from '../styles/components/Form.module.css';
import Loader from '../components/Loader';

const Login = () => {
  const [{ uid }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    generateRecaptcha();
  }, []);

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
    setLoading(true);
    if (phoneNumber.length !== 10) {
      setMessage('Phone number must be exactly 10 digits long.');
      setColor('#e19a00');
      setOpenSnackbar(true);
      setLoading(false);
    } else {
      const q = query(
        collection(db, 'users'),
        where('phoneNumber', '==', phoneNumber)
      );
      const querySnapshot = await getDocs(q);

      let userFoundFlag = false;

      querySnapshot.forEach((doc) => {
        userFoundFlag = true;
      });

      if (userFoundFlag) {
        // generateRecaptcha();

        const appVerifier = window.recaptchaVerifier;

        await signInWithPhoneNumber(auth, `+91 ${phoneNumber}`, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setShowOtpField(true);
          })
          .catch((error) => {
            console.log(error);
            setMessage('Opps. Something went wrong, Please try again. :(');
            setColor('#d7082b');
            setOpenSnackbar(true);
            setLoading(false);
          });
      } else {
        setMessage('Entered phone number is not registered with pupfinder.');
        setColor('#d7082b');
        setOpenSnackbar(true);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
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
          dispatch({ type: actionTypes.SET_UID, uid: user.uid });
          navigate('/');
        })
        .catch((error) => {
          if (error.message == 'dispatch is not a function') {
            return navigate('/');
          }
          setMessage('OTP you have entered is incorrect. Please try again.');
          console.log(error.message);
          setColor('#d7082b');
          setLoading(false);
          setOpenSnackbar(true);
        });
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h1>Login</h1>

          {showOtpField ? (
            <>
              <span>
                OTP has been sent successfullt to +91
                <strong> {phoneNumber}</strong>
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
              <button onClick={verifyOTP}>
                {loading ? <Loader /> : 'Submit'}
              </button>
            </>
          ) : (
            <>
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
              <button onClick={sendOTP} disabled={loading}>
                {loading ? <Loader /> : ' Get OTP'}
              </button>
            </>
          )}

          <p>
            Don't have an account?
            <span onClick={() => navigate('/signup')}>Click here</span>
          </p>
        </div>
        <div id="recaptcha-container"></div>
      </div>

      <Snackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        message={message}
        color={color}
      />
    </>
  );
};

export default Login;
