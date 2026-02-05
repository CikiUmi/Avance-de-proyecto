const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas existentes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/catalogo', require('./routes/catalogoRoutes'));
app.use('/api/pedido', require('./routes/pedidoRoutes'));
app.use('/api/cuentaUsuario', require('./routes/cuentaUsuarioRoutes'));
app.use('/api/carrito', require('./routes/carritoRoutes'));
const authMiddleware = require('./middleware/auth');

// Servir archivos estáticos de public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta raíz -> página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'Catalogos', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
