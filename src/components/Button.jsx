import styles from '../styles/App.module.css';

const Button = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>{children}</button>
);
export default Button;
