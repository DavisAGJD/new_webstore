// src/pages/AdminOrdersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './styles/AdminOrdersPage.css';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="admin-orders-container">
                <h2>Admin Orders</h2>
                {orders.map(order => (
                    <div key={order.PedidoID} className="order-card">
                        <div className="order-header">
                            <h3>ID pedido: <span className="highlight">{order.PedidoID}</span></h3>
                            <p>ID cliente: <span className="highlight">{order.ClienteID}</span></p>
                            <p>Fecha: {new Date(order.FechaPedido).toLocaleString()}</p>
                            <p>Total: ${order.Total}</p>
                        </div>
                        <div className="order-products">
                            <h4>Productos:</h4>
                            <div className="products-container">
                                {order.productos.map(product => (
                                    <div key={product.ProductoID} className="product-card">
                                        <img src={product.Imagen} alt={product.Nombre} className="product-image" />
                                        <p>{product.Nombre} ${product.Precio} x {product.Cantidad}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
