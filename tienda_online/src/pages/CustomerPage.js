// src/pages/CustomersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './styles/CustomerPage.css';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del localStorage
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/customers`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluir el token en los encabezados
                    }
                });
                setCustomers(res.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };

        fetchCustomers();
    }, []);

    return (
    <div>
        <Navbar/>
        <div className="admin-customers-container">
            <h2>Clientes</h2>
            <div className="admin-customer-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Total Compras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.nombre}</td>
                                <td>{customer.Email}</td>
                                <td>{customer.totalCompras}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default CustomersPage;
