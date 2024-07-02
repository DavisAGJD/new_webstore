import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/CategoryProductsPage.css';
const CategoryProductsPage = () => {
    const { categoryID } = useParams();
    const [categoryName, setCategoryName] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/category/${categoryID}`);
                setCategoryName(response.data.categoryName);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsByCategory();
    }, [categoryID]);

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
                                <button>Agregar al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryProductsPage;
