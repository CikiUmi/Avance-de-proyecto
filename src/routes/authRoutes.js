const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cuenta = require('../models/CuentaUsuario');

const router = express.Router();

// Helper: generar token
const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresIn = process.env.TOKEN_EXPIRES_IN;
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    if (!correo || !password) return res.status(400).json({ message: 'Se necesita correo y contraseña' });

    const existing = await CuentaUsuario.findOne({ correo });
    if (existing) return res.status(409).json({ message: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10); //caracteres random
    const hashed = await bcrypt.hash(password, salt);

    const user = await CuentaUsuario.create({ nombre, correo, password: hashed });

    const token = generateToken(user);
    res.status(201).json({
      message: 'Usuario creado',
      user: { id: user._id, nombre: user.nombre, correo: user.correo },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});



// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Se necesita correo y contraseña' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = generateToken(user);
    res.json({
      message: 'Autenticado',
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router; //para usar en server.js
