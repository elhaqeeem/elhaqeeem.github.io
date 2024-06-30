// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/apiService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardData();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {dashboardData.map((item) => (
          <div key={item.id}>
            {/* Render your dashboard components here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
