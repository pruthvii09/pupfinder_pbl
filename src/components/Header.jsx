import React, { useEffect } from 'react';
import { actionTypes, useStateValue } from '../store';
import styles from '../styles/components/Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [{ uid }, dispatch] = useStateValue();

  const navigate = useNavigate();

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

      <ul>
        <li>
          <a
            href="/order-belt"
            onClick={(e) => {
              e.preventDefault();
              navigate('/order-belt');
            }}
          >
            Order belt
          </a>
        </li>

        {!uid && (
          <>
            <li>
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
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
                  navigate('/login');
                }}
              >
                Login
              </a>
            </li>
          </>
        )}

        {uid && (
          <li>
            <a
              href="/account"
              onClick={(e) => {
                e.preventDefault();
                navigate('/account');
              }}
            >
              Account
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
