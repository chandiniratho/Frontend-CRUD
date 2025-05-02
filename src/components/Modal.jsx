import styles from '../styles/App.module.css';
import Button from './Button';

const Modal = ({ children, onClose }) => (
  <div className={styles.modal}>
    <Button onClick={onClose}>Close</Button>
    {children}
  </div>
);
export default Modal;
