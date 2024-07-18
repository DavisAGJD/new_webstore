import React, { useContext, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { CartContext } from '../components/CartContext';
import './styles/CartPage.css';

const CartPage = () => {
    const { cart, total, clearCart, updateQuantity } = useContext(CartContext);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);

    const handlePlaceOrder = () => {
        setShowConfirmation(true);
    };

    const confirmOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const order = {
                products: cart.map(item => ({
                    ProductoID: item.ProductoID,
                    Cantidad: item.Cantidad,
                    Precio: item.Precio
                })),
                total,
                estado: 'Pendiente'
            };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, order, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                clearCart();
                setShowConfirmation(false);
            } else {
                setError('Error al procesar el pedido. Inténtalo de nuevo.');
            }
        } catch (error) {
            setError('Error al procesar el pedido. Inténtalo de nuevo.');
            console.error('Error placing order:', error);
        }
    };

    const cancelOrder = () => {
        setShowConfirmation(false);
    };

    if (!cart) {
        return (
            <div>
                <Navbar />
                <div className="loading">Cargando...</div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="empty-cart">No hay productos en el carrito.</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                <h2>Carrito de Compras</h2>
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.Imagen} alt={item.Nombre} className="product-image" />
                            <div className="product-info">
                                <h3>{item.Nombre}</h3>
                                <p>Precio: ${item.Precio}</p>
                                <p>Descripción: {item.Descripcion}</p>
                            </div>
                            <div className="quantity-control">
                                <button onClick={() => updateQuantity(index, item.Cantidad - 1)} disabled={item.Cantidad <= 1}>-</button>
                                <span>{item.Cantidad}</span>
                                <button onClick={() => updateQuantity(index, item.Cantidad + 1)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="cart-total">Total: ${total}</h3>
                <div className="cart-actions">
                    <button className="cart-button red-button" onClick={clearCart}>Vaciar Carrito</button>
                    <button className="cart-button green-button" onClick={handlePlaceOrder}>Realizar Pedido</button>
                </div>
                {showConfirmation && (
                    <div className="overlay">
                        <div className="message-box">
                            <p>¿Confirmar la compra?</p>
                            <button onClick={confirmOrder}>Sí</button>
                            <button onClick={cancelOrder}>No</button>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
