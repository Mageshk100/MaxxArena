import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // CRITICAL: This allows the browser to send/receive HTTP-only cookies (your refreshToken)
});

export default api;
