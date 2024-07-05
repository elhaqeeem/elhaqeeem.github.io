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
            { <table>
        <thead>
          <tr>
            <th>customerId :</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>emailAddress</th>
            <th>phoneNumber</th>
            <th>address</th>
            {/* Add more headers based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {dashboardData.map((item) => (
            <tr key={item.id}>
              <td>{item.customer_id}</td>
              <td>{item.first_name}</td>
              <td>{item.email}</td>
              <td>{item.email}</td>
              <td>{item.email}</td>
              <td>{item.email}</td>
              {/* Render more columns based on your data */}
            </tr>
          ))}
        </tbody>
      </table>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
