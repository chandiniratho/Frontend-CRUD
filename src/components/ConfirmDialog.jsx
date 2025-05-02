// ConfirmDialog.jsx
import styles from '../styles/App.module.css'; // optional for future enhancements
import Button from './Button';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div>
    <p>{message}</p>
    <Button onClick={onConfirm}>Yes</Button>
    <Button onClick={onCancel}>No</Button>
  </div>
);

export default ConfirmDialog;
