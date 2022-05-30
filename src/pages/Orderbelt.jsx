import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionTypes, useStateValue } from '../store';
import Wizard from '../components/orderbelt/Wizard';

const Orderbelt = () => {
  const [{ uid }, dispatch] = useStateValue();

  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      navigate('/signup');
    }
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          marginTop: 30,
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        Order belt
      </h1>
      <Wizard />
    </>
  );
};

export default Orderbelt;
