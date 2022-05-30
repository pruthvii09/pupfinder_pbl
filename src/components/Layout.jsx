import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { actionTypes, useStateValue } from '../store';
import Header from './Header';

const Layout = ({ children }) => {
  const [{ uid }, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: actionTypes.SET_UID, uid: user.uid });
        console.log(user.uid);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
