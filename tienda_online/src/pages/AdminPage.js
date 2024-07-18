// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Sidebar from '../components/Sidebar';
import './styles/AdminPage.css';
import './styles/Modal.css';

Modal.setAppElement('#root');

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        categoryID: ''
    });
    const [editProduct, setEditProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/categories`);
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
                Nombre: newProduct.name,
                Precio: newProduct.price,
                Stock: newProduct.stock,
                Descripcion: newProduct.description,
                Imagen: newProduct.image,
                CategoriaID: newProduct.categoryID
            });
            setProducts([...products, res.data]);
            setNewProduct({ name: '', price: '', stock: '', description: '', image: '', categoryID: '' });
            setNotification('Producto añadido exitosamente.');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/products/${editProduct.ProductoID}`, {
                Nombre: editProduct.Nombre,
                Precio: editProduct.Precio,
                Stock: editProduct.Stock,
                Descripcion: editProduct.Descripcion,
                Imagen: editProduct.Imagen,
                CategoriaID: editProduct.CategoriaID
            });
            setProducts(products.map(product => product.ProductoID === editProduct.ProductoID ? res.data : product));
            setEditProduct(null);
            setIsModalOpen(false);
            setNotification('Producto actualizado exitosamente.');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`);
            setProducts(products.filter(product => product.ProductoID !== productId));
            setNotification('Producto eliminado exitosamente.');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleEditProductClick = (product) => {
        setEditProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-main-content">
                <div className="admin-content">
                    <h2>Admin Panel</h2>
                    <div className="admin-form">
                        <h3>Añadir Producto</h3>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Descripción"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="URL de la Imagen"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    value={newProduct.categoryID}
                                    onChange={(e) => setNewProduct({ ...newProduct, categoryID: e.target.value })}
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.CategoriaID} value={category.CategoriaID}>
                                            {category.Nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit">Añadir Producto</button>
                        </form>
                    </div>
                    <div className="admin-product-list">
                        <h3>Lista de Productos</h3>
                        <div className="product-cards">
                            {products.map((product) => (
                                <div key={product.ProductoID} className="product-card">
                                    <img src={product.Imagen} alt={product.Nombre} className="product-image" />
                                    <div className="product-info">
                                        <h4>{product.Nombre}</h4>
                                        <p>Precio: ${product.Precio}</p>
                                        <p>Stock: {product.Stock}</p>
                                        <p>Descripción: {product.Descripcion}</p>
                                        <p>Categoría: {categories.find(cat => cat.CategoriaID === product.CategoriaID)?.Nombre || 'Sin categoría'}</p>
                                    </div>
                                    <div className="product-actions">
                                        <button onClick={() => handleEditProductClick(product)}>Modificar</button>
                                        <button onClick={() => handleDeleteProduct(product.ProductoID)}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Modificar Producto"
                className="Modal"
                overlayClassName="Overlay"
            >
                {editProduct && (
                    <div className="edit-product-form">
                        <h3>Modificar Producto</h3>
                        <form onSubmit={handleEditProduct}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={editProduct.Nombre}
                                    onChange={(e) => setEditProduct({ ...editProduct, Nombre: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={editProduct.Precio}
                                    onChange={(e) => setEditProduct({ ...editProduct, Precio: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={editProduct.Stock}
                                    onChange={(e) => setEditProduct({ ...editProduct, Stock: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Descripción"
                                    value={editProduct.Descripcion}
                                    onChange={(e) => setEditProduct({ ...editProduct, Descripcion: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="URL de la Imagen"
                                    value={editProduct.Imagen}
                                    onChange={(e) => setEditProduct({ ...editProduct, Imagen: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    value={editProduct.CategoriaID}
                                    onChange={(e) => setEditProduct({ ...editProduct, CategoriaID: e.target.value })}
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.CategoriaID} value={category.CategoriaID}>
                                            {category.Nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit">Guardar Cambios</button>
                        </form>
                    </div>
                )}
            </Modal>
            {notification && (
                <div className="notification">
                    {notification}
                    <button className="close-button" onClick={() => setNotification('')}>×</button>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
