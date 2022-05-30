// @PATH /admin/dashboard

import React, { useState, useEffect } from 'react';
import { useStateValue } from '../store';
import { useNavigate } from 'react-router-dom';
import AddProduct from '../components/dashboard/AddProduct';
import ViewOrders from '../components/dashboard/ViewOrders';
import ViewPoroducts from '../components/dashboard/ViewPoroducts';
import ViewPosts from '../components/dashboard/ViewPosts';
import styles from '../styles/pages/Dashboard.module.css';

const Dashboard = () => {
  const [{ admin }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [choice, setChoice] = useState(1);

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <ul>
        <li
          onClick={() => setChoice(1)}
          className={choice === 1 && styles.active}
        >
          Add Product
        </li>
        <li
          onClick={() => setChoice(2)}
          className={choice === 2 && styles.active}
        >
          View Orders
        </li>
        <li
          onClick={() => setChoice(3)}
          className={choice === 3 && styles.active}
        >
          View Products
        </li>
        <li
          onClick={() => setChoice(4)}
          className={choice === 4 && styles.active}
        >
          View Posts
        </li>
      </ul>

      {choice === 1 ? (
        <AddProduct />
      ) : choice === 2 ? (
        <ViewOrders />
      ) : choice === 3 ? (
        <ViewPoroducts />
      ) : (
        <ViewPosts />
      )}
    </div>
  );
};

export default Dashboard;
