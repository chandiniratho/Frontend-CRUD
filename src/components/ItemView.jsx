const ItemView = ({ item }) => {
    if (!item) return null;
    return (
      <div>
        <h3>Item Detail</h3>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Status:</strong> {item.status}</p>
      </div>
    );
  };
  export default ItemView;
  