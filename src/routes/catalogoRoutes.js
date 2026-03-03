const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  createProducto,
  getCatalogo,
  getProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/catalogoController');

router.post('/', auth, createProducto);   /* Crear */
router.get('/', auth, getCatalogo);      /* Leer todos */
router.get('/:id', auth, getProducto);      /* Leer uno */
router.put('/:id', auth, updateProducto);      /* Actualizar */
router.delete('/:id', auth, deleteProducto);      /* Eliminar uno */

module.exports = router;