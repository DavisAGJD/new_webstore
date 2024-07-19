const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { poolPromise } = require('../config/db');

const createServer = () => {
  const app = express();

  app.use(bodyParser.json());

  // Configuración de CORS
  const corsOptions = {
    origin: 'https://web-store-two-zeta.vercel.app', // URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // habilitar preflight para todas las rutas

  app.get('/', (req, res) => {
    res.send("Hola, este es tu back");
  });

  app.get('/get/test/db', async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT COUNT(*) as count FROM Usuarios');
      res.json({ count: result.recordset[0].count });
    } catch (err) {
      console.error('SQL error', err);
      res.status(500).json({ error: err.message });
    }
  });

  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/', orderRoutes);

  // Manejo de errores 404
  app.use((req, res, next) => {
    res.status(404).send("Página no encontrada");
  });

  // Manejo de errores generales
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });

  return app;
};

// Exporta la función createServer para que Vercel la use
module.exports = createServer;
