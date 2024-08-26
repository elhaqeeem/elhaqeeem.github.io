import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

const DataTableComponent = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    marketingID: '',
    date: '',
    cargoFee: '',
    totalBalance: '',
  });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [first, setFirst] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Move error state inside the component

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error on each fetch attempt
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError('Failed to fetch customer data.'); // Set error message
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openNewCustomerDialog = () => {
    setNewCustomer({
      marketingID: '',
      date: '',
      cargoFee: '',
      totalBalance: '',
    });
    setIsEditing(false);
    setDialogVisible(true);
  };

  const openEditCustomerDialog = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer(customer);
    setIsEditing(true);
    setDialogVisible(true);
  };

  const handleAddCustomer = () => {
    const newCustomerData = { id: Date.now(), ...newCustomer };
    setCustomers((prevCustomers) => [...prevCustomers, newCustomerData]);
    setDialogVisible(false);
    Swal.fire({
      title: 'Success!',
      text: 'Customer added successfully.',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  const handleUpdateCustomer = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => (customer.id === editingCustomer.id ? newCustomer : customer))
    );
    setDialogVisible(false);
    Swal.fire({
      title: 'Updated!',
      text: 'Customer updated successfully.',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  };

  const handleDeleteCustomer = (customerId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
        Swal.fire(
          'Deleted!',
          'The customer has been deleted.',
          'success'
        );
      }
    });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.TransactionNumber?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h3>Customer List</h3>

      {error && <p className="error">{error}</p>} {/* Display error message */}

      <Button label="Add New Customer" icon="pi pi-plus" onClick={openNewCustomerDialog} />

      {/* Search Filter */}
      <div className="p-mb-2">
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by Transaction Number"
        />
      </div>

      {/* Data Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          value={filteredCustomers.slice(first, first + rowsPerPage)}
          showGridlines
          paginator
          rows={rowsPerPage}
          first={first}
          onPage={(e) => {
            setFirst(e.first);
          }}
          totalRecords={filteredCustomers.length}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column field="id" header="ID" sortable style={{ width: '5%' }} />
          <Column field="TransactionNumber" header="Transaction Number" />
          <Column field="MarketingID" header="Marketing ID" />
          <Column field="Date" header="Date" />
          <Column field="CargoFee" header="Cargo Fee" />
          <Column field="TotalBalance" header="Total Balance" />
          <Column field="GrandTotal" header="Grand Total" />
          <Column
            header="Actions"
            body={(rowData) => (
              <div>
                <Button
                  icon="pi pi-pencil"
                  onClick={() => openEditCustomerDialog(rowData)}
                  className="p-button-warning"
                />
                <Button
                  icon="pi pi-trash"
                  onClick={() => handleDeleteCustomer(rowData.id)}
                  className="p-button-danger"
                />
              </div>
            )}
          />
        </DataTable>
      )}

      {filteredCustomers.length === 0 && !loading && (
        <p>No available options</p>
      )}

      {/* Customer Dialog */}
      <Dialog
        visible={isDialogVisible}
        onHide={() => setDialogVisible(false)}
        header={isEditing ? 'Edit Customer' : 'Add New Customer'}
        footer={
          <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setDialogVisible(false)} />
            <Button
              label={isEditing ? 'Update Customer' : 'Add Customer'}
              icon="pi pi-check"
              onClick={isEditing ? handleUpdateCustomer : handleAddCustomer}
            />
          </div>
        }
      >
        <div>
          <InputText
            name="marketingID"
            value={newCustomer.marketingID}
            onChange={handleInputChange}
            placeholder="Marketing ID"
            className="p-mb-2"
          />
          <InputText
            name="date"
            type="date"
            value={newCustomer.date}
            onChange={handleInputChange}
            className="p-mb-2"
          />
          <InputText
            name="cargoFee"
            value={newCustomer.cargoFee}
            onChange={handleInputChange}
            placeholder="Cargo Fee"
            className="p-mb-2"
          />
          <InputText
            name="totalBalance"
            value={newCustomer.totalBalance}
            onChange={handleInputChange}
            placeholder="Total Balance"
            className="p-mb-2"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default DataTableComponent;
