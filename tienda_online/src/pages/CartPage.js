import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../components/CartContext';
import './styles/CartPage.css';

const CartPage = () => {
    const { cart, total, clearCart, updateQuantity } = useContext(CartContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handlePlaceOrder = () => {
        setShowConfirmation(true);
    };

    const confirmOrder = () => {
        // Aquí puedes agregar la lógica para procesar el pedido
        clearCart();
        setShowConfirmation(false);
    };

    const cancelOrder = () => {
        setShowConfirmation(false);
    };

    if (!cart) {
        return <div className="loading">Cargando...</div>;
    }

    if (cart.length === 0) {
        return <div className="empty-cart">No hay productos en el carrito.</div>;
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
            </div>
        </div>
    );
};

export default CartPage;
