import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token); // Store token
  return response.data;
};

export const getProtectedData = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/protected-route', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
