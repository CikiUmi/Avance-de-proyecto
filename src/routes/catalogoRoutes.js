const express = require('express');
const router = express.Router();

const {
  createProducto,
  getCatalogo,
  getProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/catalogoController');

router.post('/', createProducto);   /* Crear */
router.get('/', getCatalogo);      /* Leer todos */
router.get('/:id', getProducto);      /* Leer uno */
router.put('/:id', updateProducto);      /* Actualizar */
router.delete('/:id', deleteProducto);      /* Eliminar uno */

module.exports = router;