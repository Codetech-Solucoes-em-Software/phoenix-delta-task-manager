import axios from 'axios';

const API_URL_BASE = 'http://localhost:4000/v1'; 

const api = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;