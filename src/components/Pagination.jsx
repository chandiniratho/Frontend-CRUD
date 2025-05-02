// Pagination.jsx
import styles from '../styles/App.module.css'; // Add this

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => onPageChange(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
