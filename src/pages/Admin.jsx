import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionTypes, useStateValue } from '../store';
import Snackbar from '../components/Snackbar';
import styles from '../styles/components/Form.module.css';

const Admin = () => {
  const USERNAME = 'username';
  const PASSWORD = 'password';

  const [{ admin }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const handleLogin = () => {
    if (username.length <= 0 || password.length <= 0) {
      setMessage('Please enter all the details');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else if (username !== USERNAME || password !== PASSWORD) {
      setMessage('You have entered wrong credentials. Please try again.');
      setColor('#d7082b');
      setOpenSnackbar(true);
    } else {
      dispatch({ type: actionTypes.SET_ADMIN, admin: true });
      navigate('/admin/dashboard');
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h1>Admin login</h1>

          <div className={styles.field}>
            <label htmlFor="username">Admin username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>

      <Snackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        message={message}
        color={color}
      />
    </>
  );
};

export default Admin;
