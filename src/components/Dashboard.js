import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

const DataTableComponent = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data); // Assuming data is an array of customer objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Customer List</h3>
      <DataTable value={customers}
      showGridlines
      >
        <Column field="customer_id" header="ID" sortable style={{ width: '25%' }}/>
        <Column field="firstName" header="Name" />
        <Column field="lastName" header="Email" />
        <Column field="emailAddress" header="Email" />
        <Column field="phoneNumber" header="Email" />
        <Column field="address" header="Email" />
        {/* Add more columns as per your data structure */}
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
