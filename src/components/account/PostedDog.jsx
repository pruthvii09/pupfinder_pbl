import React from 'react';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import styles from '../../styles/components/account/PostedDog.module.css';

const PostedDog = ({ postedDog }) => {
  const deletePostedDog = async (id) => {
    const adoptionDoc = doc(db, 'adoptions', id);
    await deleteDoc(adoptionDoc);
  };

  return (
    <div className={styles.container}>
      <img src={postedDog?.image} alt={`${postedDog?.id}_image`} />
      <div className={styles.information}>
        <h5>{postedDog?.breed}</h5>
        <p>{postedDog?.address}</p>
        <p>{postedDog?.city}</p>
      </div>
      <button onClick={() => deletePostedDog(postedDog?.id)}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default PostedDog;
