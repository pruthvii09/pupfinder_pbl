import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useStateValue } from '../../store';
import styles from '../../styles/components/orderbelt/Wizard.module.css';
import BeltInformation from './BeltInformation';
import OrderInformation from './OrderInformation';
import PaymentInformation from './PaymentInformation';

const Wizard = () => {
  const [{ uid }, dispatch] = useStateValue();

  const [currentWizard, setCurrentWizard] = useState('1');

  const options = ['Aurangabad', 'Pune', 'Mumbai', 'Jalna', 'Beed', 'Latur'];

  const [products, setProducts] = useState([]);

  const [image, setImage] = useState('');
  const [petName, setPetName] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [beltType, setBeltType] = useState('');
  const [beltId, setBeltId] = useState('');
  const [beltImage, setBeltImage] = useState('');
  const [beltPrice, setBeltPrice] = useState('');

  const [orderStreetAddress, setOrderStreetAddress] = useState('');
  const [orderAddressLine2, setOrderAddressLine2] = useState('');
  const [orderCity, setOrderCity] = useState('Aurangabad');
  const [orderPincode, setOrderPincode] = useState('');
  const [orderPhoneNumber, setOrderPhoneNumber] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  useEffect(() => {
    const getProducts = async () => {
      const q = query(collection(db, 'products'));
      onSnapshot(q, (querySnapshot) => {
        const tempProducts = [];
        querySnapshot.forEach((doc) => {
          tempProducts.push({ ...doc.data(), id: doc.id });
        });
        setProducts(tempProducts);
      });
    };

    getProducts();
  }, []);

  const handleBeltInformation = () => {
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
    } else if (beltType.length <= 0) {
      setMessage('Please select belt type');
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
      setCurrentWizard('2');
    }
  };

  const handleOrderInformation = () => {
    if (
      orderStreetAddress.length <= 0 ||
      orderAddressLine2.length <= 0 ||
      orderCity.length <= 0 ||
      orderPincode.length <= 0
    ) {
      setMessage('Please enter all the details');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else if (orderPhoneNumber.length !== 10) {
      setMessage('Phone number must be exactly 10 digits long.');
      setColor('#e19a00');
      setOpenSnackbar(true);
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
              beltType: beltType,
              beltId: beltId,
              beltImage: beltImage,
              beltPrice: beltPrice,
              orderStreetAddress: orderStreetAddress,
              orderAddressLine2: orderAddressLine2,
              orderCity: orderCity,
              orderPincode: orderPincode,
              orderPhoneNumber: orderPhoneNumber,
              orderedAt: currentDate,
              packaging: false,
              dispatched: false,
              dispatchedAt: '',
              delivered: false,
              deliveredAt: '',
            });

            // decrement quantity of ordered belt
            const beltRef = doc(db, 'products', beltId);
            updateDoc(beltRef, {
              quantity: increment(-1),
            });
          });
          setMessage('Your order is placed successfully.');
          setColor('#1fcf0a');
          setOpenSnackbar(true);
        })
        .catch((error) => {
          setMessage('Opps. Something went wrong, Please try again. :(');
          setColor('#d7082b');
          setOpenSnackbar(true);
        });
      // setCurrentWizard('3');
    }
  };

  return (
    <div className={styles.wizard}>
      <div className={styles.wizardHeader}>
        <div
          className={
            currentWizard === '1'
              ? `${styles.singleWizard} ${styles.singleWizardActive}`
              : `${styles.singleWizard}`
          }
          onClick={() => setCurrentWizard('1')}
        >
          <span
            className={
              currentWizard === '1'
                ? `${styles.wizardNumberActive}`
                : `${styles.wizardNumber}`
            }
          >
            1
          </span>
        </div>
        <div className={styles.line}></div>
        <div
          className={
            currentWizard === '2'
              ? `${styles.singleWizard} ${styles.singleWizardActive}`
              : `${styles.singleWizard}`
          }
          onClick={() => setCurrentWizard('2')}
        >
          <span
            className={
              currentWizard === '2'
                ? `${styles.wizardNumberActive}`
                : `${styles.wizardNumber}`
            }
          >
            2
          </span>
        </div>
        <div className={styles.line}></div>
        <div
          className={
            currentWizard === '3'
              ? `${styles.singleWizard} ${styles.singleWizardActive}`
              : `${styles.singleWizard}`
          }
          onClick={() => setCurrentWizard('3')}
        >
          <span
            className={
              currentWizard === '3'
                ? `${styles.wizardNumberActive}`
                : `${styles.wizardNumber}`
            }
          >
            3
          </span>
        </div>
      </div>

      {currentWizard === '1' ? (
        <BeltInformation
          products={products}
          image={image}
          setImage={setImage}
          petName={petName}
          setPetName={setPetName}
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          beltType={beltType}
          setBeltType={setBeltType}
          beltId={beltId}
          setBeltId={setBeltId}
          setBeltImage={setBeltImage}
          setBeltPrice={setBeltPrice}
          setCurrentWizard={setCurrentWizard}
          handleBeltInformation={handleBeltInformation}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          message={message}
          setMessage={setMessage}
          color={color}
          setColor={setColor}
        />
      ) : currentWizard === '2' ? (
        <OrderInformation
          options={options}
          orderStreetAddress={orderStreetAddress}
          setOrderStreetAddress={setOrderStreetAddress}
          orderAddressLine2={orderAddressLine2}
          setOrderAddressLine2={setOrderAddressLine2}
          setOrderCity={setOrderCity}
          orderPincode={orderPincode}
          setOrderPincode={setOrderPincode}
          orderPhoneNumber={orderPhoneNumber}
          setOrderPhoneNumber={setOrderPhoneNumber}
          setCurrentWizard={setCurrentWizard}
          handleOrderInformation={handleOrderInformation}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          message={message}
          setMessage={setMessage}
          color={color}
          setColor={setColor}
        />
      ) : (
        <PaymentInformation />
      )}
    </div>
  );
};

export default Wizard;
