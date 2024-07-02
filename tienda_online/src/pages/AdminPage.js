// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './styles/AdminPage.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        categoryID: '' // Nuevo campo para la categoría
    });
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products/categories');
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
            const res = await axios.post('http://localhost:5000/api/products', {
                Nombre: newProduct.name,
                Precio: newProduct.price,
                Stock: newProduct.stock,
                Descripcion: newProduct.description,
                Imagen: newProduct.image,
                CategoriaID: newProduct.categoryID // Enviar la categoría
            });
            setProducts([...products, res.data]);
            setNewProduct({ name: '', price: '', stock: '', description: '', image: '', categoryID: '' });
        } catch (error) {
            console.error('Error adding product', error);
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/products/${editProduct.ProductoID}`, {
                Nombre: editProduct.Nombre,
                Precio: editProduct.Precio,
                Stock: editProduct.Stock,
                Descripcion: editProduct.Descripcion,
                Imagen: editProduct.Imagen,
                CategoriaID: editProduct.CategoriaID // Enviar la categoría
            });
            setProducts(products.map(product => product.ProductoID === editProduct.ProductoID ? res.data : product));
            setEditProduct(null);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            setProducts(products.filter(product => product.ProductoID !== productId));
        } catch (error) {
            console.error('Error deleting product', error);
        }
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
                                        <button onClick={() => setEditProduct(product)}>Modificar</button>
                                        <button onClick={() => handleDeleteProduct(product.ProductoID)}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
