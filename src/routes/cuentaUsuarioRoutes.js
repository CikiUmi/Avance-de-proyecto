const express = require('express');
const router = express.Router();

const {
  createCuentaUsuario,
  getCuentaUsuario,
  updateCuentaUsuario,
  deleteCuentaUsuario
} = require('../controllers/cuentaUsuarioController');

router.post('/', createCuentaUsuario);   /* Crear */
router.get('/:id', getCuentaUsuario);      /* Leer uno */
router.put('/:id', updateCuentaUsuario);      /* Actualizar uno */
router.delete('/:id', deleteCuentaUsuario);      /* Eliminar uno */

module.exports = router;