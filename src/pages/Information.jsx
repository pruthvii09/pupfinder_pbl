// @PATH /:id

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import styles from '../styles/pages/Information.module.css';

const Information = () => {
  const { uid } = useParams();

  const [information, setInformation] = useState({});

  useEffect(() => {
    const getInformation = async () => {
      onSnapshot(doc(db, 'orders', uid), (doc) => {
        setInformation(doc.data());
      });
    };

    getInformation();
  }, []);

  return (
    <div className={styles.informationContainer}>
      <img src={information.image} alt={`${information.name}_image`} />
      <h4>{information.petName}</h4>
      <p>
        Owner's name:<span>{information.name}</span>
      </p>
      <a href={`tel:${information.phoneNumber}`}>
        Contact number:<span>{information.phoneNumber}</span>
        <i className="fa-solid fa-phone"></i>
      </a>
      <a href={`mailto:${information.email}`}>
        Email:<span>{information.email}</span>
        <i className="fa-solid fa-envelope"></i>
      </a>
      <p>
        Address:<span>{information.address}</span>
        <i className="fa-solid fa-road"></i>
      </p>

      <strong>Help {information.petName} to reach out his owner!</strong>
    </div>
  );
};

export default Information;
