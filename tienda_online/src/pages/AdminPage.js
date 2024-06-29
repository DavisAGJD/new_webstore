import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: ''
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

        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/products', {
                Nombre: newProduct.name,
                Precio: newProduct.price,
                Stock: newProduct.stock,
                Descripcion: newProduct.description,
                Imagen: newProduct.image
            });
            setProducts([...products, res.data]);
            setNewProduct({ name: '', price: '', stock: '', description: '', image: '' });
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
                Imagen: editProduct.Imagen
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
        <div>
            <Navbar />
            <div className="admin-container">
                <h2>Admin Panel</h2>
                <div className="admin-content">
                    <div className="admin-left">
                        <h3>Añadir Producto</h3>
                        <form className="add-product-form" onSubmit={handleAddProduct}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Precio"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            />
                            <textarea
                                placeholder="Descripción"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            ></textarea>
                            <input
                                type="text"
                                placeholder="URL de la Imagen"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                            <button type="submit">Añadir Producto</button>
                        </form>
                    </div>
                    <div className="admin-right">
                        <h3>Lista de Productos</h3>
                        <ul>
                            {products.map((product) => (
                                <li key={product.ProductoID}>
                                    <img src={product.Imagen} alt={product.Nombre} className="product-image" />
                                    <div className="product-info">
                                        <h4>{product.Nombre}</h4>
                                        <p>Precio: ${product.Precio}</p>
                                        <p>Stock: {product.Stock}</p>
                                        <p>Descripción: {product.Descripcion}</p>
                                    </div>
                                    <div className="product-actions">
                                        <button onClick={() => setEditProduct(product)}>Modificar</button>
                                        <button onClick={() => handleDeleteProduct(product.ProductoID)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {editProduct && (
                    <div className="edit-product-form">
                        <h3>Modificar Producto</h3>
                        <form onSubmit={handleEditProduct}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={editProduct.Nombre}
                                onChange={(e) => setEditProduct({ ...editProduct, Nombre: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Precio"
                                value={editProduct.Precio}
                                onChange={(e) => setEditProduct({ ...editProduct, Precio: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={editProduct.Stock}
                                onChange={(e) => setEditProduct({ ...editProduct, Stock: e.target.value })}
                            />
                            <textarea
                                placeholder="Descripción"
                                value={editProduct.Descripcion}
                                onChange={(e) => setEditProduct({ ...editProduct, Descripcion: e.target.value })}
                            ></textarea>
                            <input
                                type="text"
                                placeholder="URL de la Imagen"
                                value={editProduct.Imagen}
                                onChange={(e) => setEditProduct({ ...editProduct, Imagen: e.target.value })}
                            />
                            <button type="submit">Guardar Cambios</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
