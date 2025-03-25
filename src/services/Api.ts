import axios from 'axios';

const API_URL_BASE = 'https://api-evolucoes-phoenix-delta.onrender.com/v1'; 
// const API_URL_BASE = 'http://localhost:4000/v1'; 
const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
    authorization: token ? token : ""
  },
});

export default api;
