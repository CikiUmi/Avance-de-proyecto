const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createCuentaUsuario,
  getCuentaUsuario,
  updateCuentaUsuario,
  deleteCuentaUsuario
} = require('../controllers/cuentaUsuarioController');

router.post('/', auth, createCuentaUsuario);   /* Crear */
router.get('/:id', auth, getCuentaUsuario);      /* Leer uno */
router.put('/:id', auth, updateCuentaUsuario);      /* Actualizar uno */
router.delete('/:id', auth, deleteCuentaUsuario);      /* Eliminar uno */

module.exports = router;