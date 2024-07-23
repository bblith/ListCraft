import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css'; // Import the CSS module

function Landing() {
  return (
    <div className={styles.landingContainer}>
      <h1>Welcome to ListCraft!</h1>
      <p>Your Task Management Companion</p>
      <div className={styles.btnContainer}>
        <NavLink to="/login" className={styles.navButton}>
          <button className={styles.button}>
            <span className={styles.text}>Login</span>
            <div className={styles.iconContainer}>
              <div className={`${styles.icon} ${styles.iconLeft}`}>
                <svg>
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </div>
              <div className={`${styles.icon} ${styles.iconRight}`}>
                <svg>
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </div>
            </div>
          </button>
        </NavLink>
        <NavLink to="/signup" className={styles.navButton}>
          <button className={styles.button}>
            <span className={styles.text}>Sign Up</span>
            <div className={styles.iconContainer}>
              <div className={`${styles.icon} ${styles.iconLeft}`}>
                <svg>
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </div>
              <div className={`${styles.icon} ${styles.iconRight}`}>
                <svg>
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </div>
            </div>
          </button>
        </NavLink>
      </div>
      <svg style={{ display: 'none' }}>
        <symbol id="arrow-right" viewBox="0 0 20 10">
          <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
        </symbol>
      </svg>
      <div className={styles.support}>
        <a href="https://twitter.com/DevLoop01" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter-square"></i></a>
        <a href="https://dribbble.com/devloop01" target="_blank" rel="noopener noreferrer"><i className="fab fa-dribbble"></i></a>
      </div>
    </div>
  );
}

export default Landing;
