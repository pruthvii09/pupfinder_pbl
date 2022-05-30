import React from 'react';
import styles from '../../styles/components/home/Card.module.css';

const Card = ({ dog }) => {
  return (
    <div className={styles.card}>
      <div className={styles.heart}>
        <i className="fa-solid fa-heart"></i>
      </div>
      <img src={dog.image} alt={`dog_${dog.id}`} />
      <div className={styles.information}>
        <h3>{dog.breed}</h3>
        <a href={`tel:${dog.phoneNumber}`}>
          {dog.phoneNumber} <i className="fa-solid fa-phone"></i>
        </a>
        <p>
          {dog.address.length >= 10
            ? `${dog.address.slice(0, 22)}...`
            : dog.address}
          <i className="fa-solid fa-road"></i>
        </p>
        <span>
          {dog.city} <i className="fa-solid fa-location-dot"></i>
        </span>
      </div>
    </div>
  );
};

export default Card;
