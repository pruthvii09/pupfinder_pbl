import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Product from './Product';

const ViewPoroducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const adoptionsCollectionRef = collection(db, 'products');

      onSnapshot(adoptionsCollectionRef, (querySnapshot) => {
        const tempProducts = [];
        querySnapshot.forEach((doc) => {
          tempProducts.push({ ...doc.data(), id: doc.id });
        });
        setProducts(tempProducts);
      });
    };

    getProducts();
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ViewPoroducts;
