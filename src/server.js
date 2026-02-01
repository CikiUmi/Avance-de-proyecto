// por el package.json y el tipo (commonjs), se usan require y module.export en vez de import from y export


const dotenv = require('dotenv'); /* Variables */
const express = require('express'); /* Framework */
const cors = require('cors'); /* peticiones */
const { connectDB } = require('./config/db') /* función para acceder a mongo */


const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');


dotenv.config(); /* agarra variables de .env */
const app = express();
const PORT = process.env.PORT;


// Rutas
app.use('/api/auth', authRoutes);

// Ejemplo de ruta protegida
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted to protected route', userId: req.user.id });
});





// Servidor :D
app.get('/', (req, res) => {
  res.send('Servidor sencillo con express y node :DD!');
});


// Middlewares y conexión
app.use(cors()); /* peticiones de dominios */
app.use(express.json()); /* para leer json */
connectDB();


// Rutas
app.use('/api/auth', authRoutes);


// Ejemplo de ruta protegida
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted to protected route', userId: req.user.id });
});




// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
