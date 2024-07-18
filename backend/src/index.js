const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hola, este es tu back");
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/', orderRoutes);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});