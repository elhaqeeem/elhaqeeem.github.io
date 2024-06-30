// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your Go backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const getDashboardData = () => {
  return apiService.get('/dashboard');
};

export { getDashboardData };
