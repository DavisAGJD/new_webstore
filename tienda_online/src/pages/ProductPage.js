// ProductsPage.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { CartContext } from '../components/CartContext';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                console.log('Products:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="productos-container">
                <h2>Productos</h2>
                <div className="productos-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.ProductoID}>
                            <img src={product.Imagen} alt={product.Nombre} />
                            <div className="product-info">
                                <h3>{product.Nombre}</h3>
                                <p>Precio: ${product.Precio}</p>
                                <p>Stock: {product.Stock}</p>
                                <p>Descripción: {product.Descripcion}</p>
                                <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
