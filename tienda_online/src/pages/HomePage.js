import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/HomePage.css';
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Bienvenidos a nuestra tienda en línea</h1>
                <p>¡Explora nuestra amplia gama de productos y disfruta de las mejores ofertas!</p>
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
            </footer>
        </div>
    );
};

export default HomePage;
