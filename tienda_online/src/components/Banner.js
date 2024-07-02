import React from 'react';
import lampImage from './assets/Lamparas.jpg'; // Imagen de la lámpara
import '../pages/styles/Banner.css'; // Asegúrate de tener un archivo de estilos para el banner

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-content">
                <h1>Obtenga hasta un 50% de descuento</h1>
                <p>No te pierdas nuestras ofertas y promociones exclusivas en productos seleccionados!</p>
            </div>
            <img src={lampImage} alt="Lamp" className="lamp-image" />
        </div>
    );
};

export default Banner;
