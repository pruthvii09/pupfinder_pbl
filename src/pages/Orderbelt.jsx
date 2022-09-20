import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../store';
import Wizard from '../components/orderbelt/Wizard';
import styles from '../styles/components/Form.module.css';

const Orderbelt = () => {
  const [{ uid }, dispatch] = useStateValue();

  const navigate = useNavigate();

  return (
    <>
      {uid ? (
        <>
          <h1
            style={{
              textAlign: 'center',
              marginTop: 30,
              fontSize: 25,
              fontWeight: 700,
              width: '100%',
            }}
          >
            Order belt
          </h1>
          <Wizard />
        </>
      ) : (
        <div className={styles.warning}>
          <h6>Please signup or login to order belt :(</h6>
          <p>
            Already have an account?
            <span onClick={() => navigate('/login')}>Click here to login</span>
          </p>
          <p>
            Don't have an account?
            <span onClick={() => navigate('/signup')}>
              Click here to signup
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Orderbelt;
