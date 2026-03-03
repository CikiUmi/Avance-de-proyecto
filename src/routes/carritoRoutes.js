const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createCarrito,
  updateProductosCarrito,
  getCarrito,
  updateCarrito,
  deleteCarrito
} = require('../controllers/carritoController');

router.post('/', auth, createCarrito);   /* Crear */
router.put('/:userID/add', auth, updateProductosCarrito);     /* Añadir producto al carrito */
router.get('/:userID', auth, getCarrito);      /* Leer uno */
router.put('/:userID', auth, updateCarrito);      /* Actualizar */
router.delete('/:userID', auth, deleteCarrito);      /* Eliminar uno */

module.exports = router;