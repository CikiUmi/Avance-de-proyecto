const express = require('express');
const router = express.Router();

const {
  createCarrito,
  updateProductosCarrito,
  getCarrito,
  updateCarrito,
  deleteCarrito
} = require('../controllers/carritoController');

router.post('/', createCarrito);   /* Crear */
router.put('/:userID/add', updateProductosCarrito);     /* Añadir producto al carrito */
router.get('/:userID/', getCarrito);      /* Leer uno */
router.put('/:userID/update', updateCarrito);      /* Actualizar */
router.delete('/:userID/delete', deleteCarrito);      /* Eliminar uno */

module.exports = router;