import React, { useEffect } from 'react';
import { actionTypes, useStateValue } from '../store';
import styles from '../styles/components/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [{ uid }, dispatch] = useStateValue();
  const [openNav, setOpenNav] = useState(false);

  const navigate = useNavigate();

  const handleNavbar = () => {
    setOpenNav(!openNav);
    console.log('hello');
  };

  return (
    <nav className={styles.navbar}>
      <a
        href="/"
        className={styles.logo}
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        <h3>pupfinder</h3>
        <i className="fa-solid fa-paw"></i>
      </a>

      <ul className={openNav ? `${styles.active}` : ''}>
        <li>
          <a
            href="/donate"
            onClick={(e) => {
              e.preventDefault();
              setOpenNav(!openNav);
              navigate('/donate');
            }}
          >
            Donate now
          </a>
        </li>

        {!uid && (
          <>
            <li>
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenNav(!openNav);
                  navigate('/signup');
                }}
              >
                Singup
              </a>
            </li>
            <li>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenNav(!openNav);
                  navigate('/login');
                }}
              >
                Login
              </a>
            </li>
          </>
        )}

        {uid && (
          <>
            <li>
              <a
                href="/post-dog"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenNav(!openNav);
                  navigate('/post-dog');
                }}
              >
                Post dog
              </a>
            </li>
            <li>
              <a
                href="/order-belt"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenNav(!openNav);
                  navigate('/order-belt');
                }}
              >
                Order belt
              </a>
            </li>
            <li>
              <a
                href="/account"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenNav(!openNav);
                  navigate('/account');
                }}
              >
                Account
              </a>
            </li>
          </>
        )}
      </ul>

      <span
        class={`material-symbols-outlined ${styles.hamburger}`}
        onClick={handleNavbar}
      >
        menu
      </span>
    </nav>
  );
};

export default Header;
