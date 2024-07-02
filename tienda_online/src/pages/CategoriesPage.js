import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/CategoriesPage.css';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
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
        return images[categoryName] || '/images/categories/default.png'; // Default image
    };

    return (
        <div>
            <Navbar />
            <div className="categories-container">
                <h2>Categorías</h2>
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
        </div>
    );
};

export default CategoriesPage;
