import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Welcome to Our Online Store</h1>
                <p>Explore our wide range of products and enjoy the best deals!</p>
                <div>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
            <footer>
                <p>&copy; 2024 Our Online Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
