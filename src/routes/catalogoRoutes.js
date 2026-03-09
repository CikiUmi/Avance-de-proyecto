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

// Rutas PÚBLICAS — no requieren token
router.get('/', getCatalogo);        /* Ver catálogo */
router.get('/:id', getProducto);     /* Ver producto individual */

// Rutas PROTEGIDAS — solo admin
router.post('/', auth, createProducto);
router.put('/:id', auth, updateProducto);
router.delete('/:id', auth, deleteProducto);

module.exports = router;
