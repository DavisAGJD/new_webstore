    import React, { useContext } from 'react';
    import axios from 'axios';
    import { CartContext } from '../components/CartContext';
    import Navbar from '../components/Navbar';
    import './styles/CartPage.css';
    const CartPage = () => {
        const { cart, total, clearCart, updateQuantity } = useContext(CartContext);

        const handlePlaceOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:5000/api/orders',
                    { products: cart, total, estado: 'Pendiente' },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Order placed:', response.data);
                clearCart();
            } catch (error) {
                console.error('Error placing order:', error);
            }
        };

        return (
            <div>
                <Navbar />
                <div className="cart-container">
                    <h2>Carrito de Compras</h2>
                    {cart.length > 0 ? (
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <img src={item.Imagen} alt={item.Nombre} className="product-image" />
                                    <span>{item.Nombre} - ${item.Precio}</span>
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(index, item.Cantidad - 1)} disabled={item.Cantidad <= 1}>-</button>
                                        <span>{item.Cantidad}</span>
                                        <button onClick={() => updateQuantity(index, item.Cantidad + 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Tu carrito está vacío.</p>
                    )}
                    <h3 className="cart-total">Total: ${total}</h3>
                    {cart.length > 0 && (
                        <div className="cart-actions">
                            <button className="cart-button red-button" onClick={clearCart}>Vaciar Carrito</button>
                            <button className="cart-button green-button" onClick={handlePlaceOrder}>Realizar Pedido</button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default CartPage;
