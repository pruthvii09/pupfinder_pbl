import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import Donation from '../components/alldonations/Donation';
import styles from '../styles/pages/AllDonations.module.css';

const AllDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const getDonations = async () => {
      const q = query(collection(db, 'donations'));
      onSnapshot(q, (querySnapshot) => {
        const tempDonations = [];
        querySnapshot.forEach((doc) => {
          tempDonations.push({ ...doc.data(), id: doc.id });
        });
        setDonations(tempDonations);
      });
    };

    getDonations();
  }, []);

  return (
    <div className={styles.donationsContainer}>
      <h1>Our donors</h1>
      {donations?.map((donation) => (
        <Donation donation={donation} key={donation.id} />
      ))}
    </div>
  );
};

export default AllDonations;
