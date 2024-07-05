// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/'; // Replace with your Go backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const getDashboardData = () => {
  return apiService.get('/customers');
};

export { getDashboardData };
