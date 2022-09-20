import React from 'react';
import styles from '../../styles/components/orderbelt/Belt.module.css';

const Belt = ({
  product,
  beltType,
  setBeltType,
  setBeltId,
  setBeltImage,
  setBeltPrice,
}) => {
  return (
    <>
      {product?.quantity > 0 && (
        <div
          className={
            product?.name === beltType
              ? `${styles.belt}  ${styles.active}`
              : `${styles.belt}`
          }
        >
          <label htmlFor={product?.name}>
            <img src={product?.image} alt={`${product?.name}_image`} />
            <p>{product?.name}</p>
            <p style={{ marginTop: 0, fontSize: 12, fontWeight: 600 }}>
              Rs. {product?.price}
            </p>
          </label>
          <input
            type="radio"
            id={product?.name}
            value={product?.name}
            name="belt"
            onChange={(e) => {
              setBeltType(e.target.value);
              setBeltId(product?.id);
              setBeltImage(product?.image);
              setBeltPrice(product?.price);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Belt;
