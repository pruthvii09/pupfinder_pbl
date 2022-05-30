import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { actionTypes, useStateValue } from '../store';
import styles from '../styles/pages/Account.module.css';
import PostedDog from '../components/account/PostedDog';
import SingleOrder from '../components/account/SingleOrder';

const Account = () => {
  const [{ uid }, dispatch] = useStateValue();

  const [postedDogs, setPostedDogs] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
      const q = query(collection(db, 'orders'), where('uid', '==', uid));
      onSnapshot(q, (querySnapshot) => {
        const tempOrders = [];
        querySnapshot.forEach((doc) => {
          tempOrders.push({ ...doc.data(), id: doc.id });
        });
        setOrders(tempOrders);
      });
    };

    getOrders();
  }, []);

  return (
    <div className={styles.accountContainer}>
      <h1>Your posted dogs</h1>
      {postedDogs.map((postedDog) => (
        <PostedDog postedDog={postedDog} key={postedDog.id} />
      ))}

      <h1 style={{ marginTop: 50 }}>Your orders</h1>
      {orders.map((order) => (
        <SingleOrder order={order} key={order.id} />
      ))}
    </div>
  );
};

export default Account;
