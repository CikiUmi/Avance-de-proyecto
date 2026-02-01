const CuentaUsuario = require('../models/CuentaUsuario');

const CuentaUsuario = require('../models/CuentaUsuario');
const bcrypt = require('bcrypt');


// ======================
// CREAR
// ======================
exports.createCuentaUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    // Validar si ya existe
    const existeUsuario = await CuentaUsuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = new CuentaUsuario({
      nombre,
      correo,
      password: passwordHash,
      rol
    });

    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear cuenta de usuario',
      error
    });
  }
};


// ======================
// READ
// ======================

/* Uno */
exports.getCuentaUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await CuentaUsuario.findById(id).select('-password');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener cuenta de usuario',
      error
    });
  }
};


// ======================
// UPDATE
// ======================
exports.updateCuentaUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    // Si se actualiza password, volver a hashear
    if (datos.password) {
      const salt = await bcrypt.genSalt(10);
      datos.password = await bcrypt.hash(datos.password, salt);
    }

    const usuarioActualizado = await CuentaUsuario.findByIdAndUpdate(
      id,
      datos,
      { new: true }
    ).select('-password');

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar cuenta de usuario',
      error
    });
  }
};


// ======================
// DELETE
// ======================
exports.deleteCuentaUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await CuentaUsuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar cuenta de usuario',
      error
    });
  }
};


