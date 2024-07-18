import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../components/CartContext';
import './styles/CategoryProductsPage.css';
import './styles/Modal.css';

const CategoryProductsPage = () => {
    const { categoryID } = useParams();
    const [categoryName, setCategoryName] = useState('');
    const [products, setProducts] = useState([]);
    const [notification, setNotification] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/category/${categoryID}`);
                setCategoryName(response.data.categoryName);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsByCategory();
    }, [categoryID]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setNotification('Producto añadido al carrito exitosamente');
        setTimeout(() => {
            setNotification('');
        }, 5000); // Oculta la notificación después de 5 segundos
    };

    const closeNotification = () => {
        setNotification('');
    };

    return (
        <div>
            <Navbar />
            <div className="productos-container">
                <h2>{categoryName}</h2>
                <div className="productos-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.ProductoID}>
                            <img src={product.Imagen} alt={product.Nombre} />
                            <div className="product-info">
                                <h3>{product.Nombre}</h3>
                                <p>Precio: ${product.Precio}</p>
                                <p>Stock: {product.Stock}</p>
                                <p>Descripción: {product.Descripcion}</p>
                                <button onClick={() => handleAddToCart(product)}>Agregar al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
                {notification && (
                    <div className="notification">
                        {notification}
                        <button className="close-button" onClick={closeNotification}>X</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryProductsPage;
