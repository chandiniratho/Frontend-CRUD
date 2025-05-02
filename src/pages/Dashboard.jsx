import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems, createItem, updateItem, deleteItem } from '../api/api';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import ItemView from '../components/ItemView';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import { fakeAuth } from '../auth/authService';
import Papa from 'papaparse';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';  // For drag-and-drop
import styles from '../styles/App.module.css';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Load items from the API
  const loadItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (data) => {
    await createItem(data);
    setToast('Item created!');
    setShowModal(false);
    loadItems();
  };

  const handleUpdate = async (data) => {
    await updateItem(selected.id, data);
    setToast('Item updated!');
    setShowModal(false);
    loadItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setToast('Item deleted!');
    loadItems();
  };

  const handleLogout = () => {
    fakeAuth.logout();
    navigate('/login');
  };

  const handleExport = () => {
    const csv = Papa.unparse(items);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'items.csv';
    link.click();
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  // Filter items based on search term
  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.id.toString().includes(search)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const userRole = fakeAuth.getUserRole() || 'guest';

  if (userRole === 'guest') {
    return <p>You must be logged in to view the dashboard.</p>;
  }

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <div className={darkMode ? styles.darkContainer : styles.container}>
      <h1>Frontend CRUD Manager</h1>

      <div className={styles.topBar}>
  <Button onClick={handleLogout}>Logout</Button>
  <Button onClick={handleDarkModeToggle}>
    {darkMode ? 'Light Mode' : 'Dark Mode'}
  </Button>
  <Button onClick={handleExport}>Export to CSV</Button>
</div>


      <SearchBar value={search} onChange={setSearch} />

      {userRole === 'admin' && (
        <Button onClick={() => { 
          setEditing(false); // Reset to "Add" mode
          setSelected(null); // Clear selected item
          setShowModal(true); 
        }}>Add Item</Button>
      )}

      {/* Drag-and-Drop List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ItemList
              items={paginated}
              onView={setViewItem}
              onEdit={(item) => {
                setSelected(item);      // select the item
                setEditing(true);       // set editing to true
                setShowModal(true);     // show the modal
              }}
              onDelete={handleDelete}
              provided={provided}  // provided for drag-and-drop functionality
            />
          )}
        </Droppable>
      </DragDropContext>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemForm
            initialValues={editing ? selected : {}}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </Modal>
      )}

      {viewItem && (
        <Modal onClose={() => setViewItem(null)}>
          <ItemView item={viewItem} />
        </Modal>
      )}

      <Toast message={toast} />
    </div>
  );
};

export default Dashboard;
