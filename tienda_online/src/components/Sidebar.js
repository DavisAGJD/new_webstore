// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../protected/AuthContext';
import { useContext } from 'react';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user || user.rolID !== 2) return null;

    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li>
                    <Link to="/products">Productos</Link>
                </li>
                <li>
                    <Link to="/admin/orders">Pedidos</Link>
                </li>
                <li>
                    <Link to="/admin/customers">Clientes</Link>
                </li>
                <li>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
