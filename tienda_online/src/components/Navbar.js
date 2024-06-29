// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../protected/AuthContext';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el ícono del carrito


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Our Store</Link>
            </div>
            <div className="navbar-links">
                <Link to="/products">Products</Link>
                {user ? (
                    <>
                        {user.rolID === 2 ? ( // Check if user is admin
                            <>
                                <Link to="/admin">Admin Panel</Link>
                                <Link to="/admin/orders">Order Management</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/cart">
                                    <FaShoppingCart /> {/* Ícono del carrito */}
                                </Link>
                                <Link to="/order-history">Order History</Link>
                            </>
                        )}
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;