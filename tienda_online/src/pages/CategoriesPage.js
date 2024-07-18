import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { CartContext } from '../components/CartContext';
import './styles/ProductPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                console.log('Products:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryID) => {
        navigate(`/category/${categoryID}`);
    };

    const getCategoryImage = (categoryName) => {
        const images = {
            'Lamparas': '/images/Lamparas.jpg',
            'Herramientas': '/images/Herramienta.png',
            'Trajes': '/images/Trajes.jpg',
            'Mascaras': '/images/Mascaras.jpg',
            'Muñecos': '/images/Muñecos.jpg'
        };
        return images[categoryName] || '/images/categories/default.png';
    };

    return (
        <div>
            <Navbar />
            <Banner />
            <div className="productos-container">
                <div className="categories-container">
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div 
                                key={category.CategoriaID} 
                                className="category-card"
                                onClick={() => handleCategoryClick(category.CategoriaID)}
                            >
                                <div className="category-image-wrapper">
                                    <img src={getCategoryImage(category.Nombre)} alt={category.Nombre} className="category-image" />
                                </div>
                                <div className="category-info">
                                    <h3>{category.Nombre}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
