import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useStateValue } from '../store';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import Loader from '../components/Loader';
import styles from '../styles/components/Form.module.css';

const FreeQR = () => {
  const [{ uid }] = useStateValue();

  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [petName, setPetName] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const navigate = useNavigate();

  const handleGenerateQR = async () => {
    setLoading(true);
    if (
      petName.length <= 0 ||
      name.length <= 0 ||
      address.length <= 0 ||
      phoneNumber.length <= 0 ||
      email.length <= 0
    ) {
      setMessage('Please enter all the details');
      setColor('#e19a00');
      setOpenSnackbar(true);
      setLoading(false);
    } else if (image.length <= 0) {
      setMessage('Please upload image of dog.');
      setColor('#e19a00');
      setOpenSnackbar(true);
      setLoading(false);
    } else if (phoneNumber.length !== 10) {
      setMessage('Phone number must be exactly 10 digits long.');
      setColor('#e19a00');
      setOpenSnackbar(true);
      setLoading(false);
    } else {
      const imageRef = ref(storage, 'images/orders/' + image.name);
      uploadBytesResumable(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // store data
            const ordersCollectionRef = collection(db, 'orders');
            addDoc(ordersCollectionRef, {
              uid: uid,
              image: url,
              petName: petName,
              name: name,
              address: address,
              phoneNumber: phoneNumber,
              email: email,
              free: true,
            }).then(() => navigate('/account'));
          });

          setImage('');
          setPetName('');
          setName('');
          setAddress('');
          setPhoneNumber('');
          setEmail('');
          setLoading(false);
        })
        .catch((error) => {
          setMessage('Opps. Something went wrong, Please try again. :(');
          setColor('#d7082b');
          setOpenSnackbar(true);
          setLoading(false);
        });
    }
    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h3 style={{ color: '#db0d0d', fontSize: 20 }}>Get QR for FREE</h3>
        <h3>QR information</h3>
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
        <button onClick={handleGenerateQR}>
          {loading ? <Loader /> : 'Get QR'}
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

export default FreeQR;
