import React from 'react';
import styles from '../../styles/pages/AllDonations.module.css';

const Donation = ({ donation }) => {
  return (
    <div className={styles.donation}>
      <h4>{donation.name}</h4>
      <h5>
        Rs. <span>{donation.amount}</span>
      </h5>
      <h6>
        {donation.phoneNumber} <i className="fa-solid fa-phone"></i>
      </h6>
    </div>
  );
};

export default Donation;
