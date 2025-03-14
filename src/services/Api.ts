import axios from 'axios';

const API_URL_BASE = 'https://api-evolucoes-phoenix-delta.onrender.com/v1'; 

const api = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;