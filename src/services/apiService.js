// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://scared-devina-ucup-0a29482b.koyeb.app/'; // Replace with your Go backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const getDashboardData = () => {
  return apiService.get('/marketing');
};

export { getDashboardData };
