import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider from './protected/AuthContext';
import { CartProvider } from './components/CartContext';
import ProtectedRoute from './protected/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Registro_login/RegisterPage';
import ProductsPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import CustomersPage from './pages/CustomerPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProductsPage from './pages/CategoryProductsPage';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/order-history" element={<OrderHistoryPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/category/:categoryID" element={<CategoryProductsPage />} />
                        <Route
                            path="/admin"
                            element={<ProtectedRoute component={AdminPage} />}
                        />
                        <Route
                            path="/admin/orders"
                            element={<ProtectedRoute component={AdminOrdersPage} adminOnly />}
                        />
                        <Route
                            path="/admin/customers"
                            element={<ProtectedRoute component={CustomersPage} adminOnly />}
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
