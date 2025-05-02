import styles from '../styles/App.module.css';

const Toast = ({ message }) => {
  if (!message) return null;
  return <div className={styles.toast}>{message}</div>;
};
export default Toast;
