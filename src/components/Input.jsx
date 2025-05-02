// Input.jsx
import React, { forwardRef } from 'react';
import styles from '../styles/App.module.css'; // Add this line

const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={styles.input} // Add this line
      {...props}
    />
  );
});

export default Input;
