import Button from './Button';
import styles from '../styles/App.module.css';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const ItemList = ({ items, onEdit, onDelete, onView, userRole }) => {
  if (!items.length) return <p className={styles.noItems}>No items found.</p>;

  return (
    <div className={styles.tableContainer}>
      <Droppable droppableId="droppable-table">
        {(droppableProvided) => (
          <table className={styles.table} ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(draggableProvided) => (
                    <tr
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={styles.tableRow}
                    >
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                      <td className={styles.actions}>
                        <Button onClick={() => onView(item)}>View</Button>
                        {userRole === 'admin' && (
                          <>
                            <Button onClick={() => onEdit(item)}>Edit</Button>
                            <Button onClick={() => onDelete(item.id)}>Delete</Button>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </tbody>
          </table>
        )}
      </Droppable>
    </div>
  );
};

export default ItemList;
