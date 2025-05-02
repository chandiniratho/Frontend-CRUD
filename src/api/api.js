import axios from 'axios';

// Use full URL directly for compatibility with GitHub Pages
const API_URL = 'https://68146c89225ff1af1628c822.mockapi.io/items';

export const getItems = () => axios.get(API_URL);
export const createItem = (data) => axios.post(API_URL, data);
export const updateItem = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
export const getItem = (id) => axios.get(`${API_URL}/${id}`);
