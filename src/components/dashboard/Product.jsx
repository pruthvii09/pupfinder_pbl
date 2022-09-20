import React from 'react';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import styles from '../../styles/components/dashboard/ViewProducts.module.css';

const Product = ({ product }) => {
  const handleDeleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  };

  return (
    <div className={styles.container}>
      <img src={product?.image} alt={`${product?.id}_image`} />
      <div className={styles.information}>
        <h5>{product?.name}</h5>
        <p>
          Price: <span>Rs. {product?.price}</span>
        </p>
        <p>
          Quantity: <span>{product?.quantity}</span>
        </p>
        <p>Description: {product?.description}</p>
      </div>
      <button onClick={() => handleDeleteProduct(product?.id)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Product;
