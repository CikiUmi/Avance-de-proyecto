// por el package.json y el tipo (commonjs), se usan require y module.export en vez de import from y export

const dotenv = require('dotenv'); /* Variables */
const express = require('express'); /* Framework */
const cors = require('cors'); /* peticiones */
const { connectDB } = require('./config/db') /* función para acceder a mongo */

dotenv.config(); /* agarra variables de .env */
const app = express(); 
const PORT = process.env.PORT;

// Middlewares y conexión
app.use(cors()); /* peticiones de dominios */
app.use(express.json()); /* para leer json */
connectDB();

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});