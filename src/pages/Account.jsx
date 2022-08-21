import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useStateValue } from '../store';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/Account.module.css';
import PostedDog from '../components/account/PostedDog';
import SingleOrder from '../components/account/SingleOrder';
import DownloadQR from '../components/account/DownloadQR';

const Account = () => {
  const [{ uid }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [postedDogs, setPostedDogs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [freeOrders, setFreeOrders] = useState([]);

  useEffect(() => {
    console.log(uid);
    if (!uid) {
      // navigate('/signup');
    }

    const getUser = async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    };

    getUser();

    const getPostedDogs = async () => {
      const q = query(collection(db, 'adoptions'), where('id', '==', uid));
      onSnapshot(q, (querySnapshot) => {
        const tempPostedDogs = [];
        querySnapshot.forEach((doc) => {
          tempPostedDogs.push({ ...doc.data(), id: doc.id });
        });
        setPostedDogs(tempPostedDogs);
      });
    };

    getPostedDogs();

    const getOrders = async () => {
      const q = query(
        collection(db, 'orders'),
        where('uid', '==', uid),
        where('free', '==', false)
      );
      onSnapshot(q, (querySnapshot) => {
        const tempOrders = [];
        querySnapshot.forEach((doc) => {
          tempOrders.push({ ...doc.data(), id: doc.id });
        });
        setOrders(tempOrders);
      });
    };

    getOrders();

    const getFreeOrders = async () => {
      const q = query(
        collection(db, 'orders'),
        where('uid', '==', uid),
        where('free', '==', true)
      );
      onSnapshot(q, (querySnapshot) => {
        const tempFreeOrders = [];
        querySnapshot.forEach((doc) => {
          tempFreeOrders.push({ ...doc.data(), id: doc.id });
        });
        setFreeOrders(tempFreeOrders);
      });
    };

    getFreeOrders();
  }, []);

  return (
    <div className={styles.accountContainer}>
      <h4>
        <span>Hello</span> {user.name}!
      </h4>
      {postedDogs.length <= 0 && SingleOrder.length <= 0 && (
        <div className={styles.warning}>
          <h6>Your posted dogs and ordered belt will appear here :(</h6>
          <p onClick={() => navigate('/post-dog')}>
            To post dogs <span>Click here</span>
          </p>
          <p onClick={() => navigate('/order-belt')}>
            To order belt <span>Click here</span>
          </p>
        </div>
      )}

      {!postedDogs.length <= 0 && (
        <>
          <h1>Your posted dogs</h1>
          {postedDogs.map((postedDog) => (
            <PostedDog postedDog={postedDog} key={postedDog.id} />
          ))}
        </>
      )}

      {!orders.length <= 0 && (
        <>
          <h1 style={{ marginTop: 50 }}>Your orders</h1>
          {orders.map((order) => (
            <SingleOrder order={order} key={order.id} />
          ))}
        </>
      )}

      {!freeOrders.length <= 0 && (
        <>
          <h1 style={{ marginTop: 50 }}>Donwload QR</h1>
          {freeOrders.map((freeOrder) => (
            <DownloadQR freeOrder={freeOrder} key={freeOrder.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Account;
