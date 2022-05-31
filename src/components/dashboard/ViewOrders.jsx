import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Order from './Order';
import styles from '../../styles/components/dashboard/ViewOrders.module.css';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersCollectionRef = query(
        collection(db, 'orders'),
        orderBy('orderedAt', 'desc')
      );

      onSnapshot(ordersCollectionRef, (querySnapshot) => {
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
    <div className={styles.ordersContainer}>
      <table>
        <tr>
          <th>Order Id</th>
          <th>Name</th>
          <th>Phone number</th>
          <th>Email</th>
          <th>Pet name</th>
          <th>Belt type</th>
          <th>Price</th>
          <th>Delivery Address</th>
          <th>Delivery phone</th>
          <th>Ordered at</th>
          <th>Payment Id</th>
          <th>Packaging</th>
          <th>Dispatched</th>
          <th>Delivered</th>
          <th>Generate QR Code</th>
          <th>Download Photo</th>
        </tr>
        {orders.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </table>
    </div>
  );
};

export default ViewOrders;
