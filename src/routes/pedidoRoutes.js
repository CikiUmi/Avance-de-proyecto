const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createPedido,
  updatePedido,
  getPedido,
  getAllPedidos,
  deletePedido
} = require('../controllers/pedidoController');

router.post('/:userID', auth, createPedido);   /* Crear pedido */
router.put('/:id', auth, updatePedido);     /* para editar el pedido */
router.get('/:id', auth, getPedido);      /* Leer uno */
router.get('/', auth, getAllPedidos);      /* Leer todos */
router.delete('/:id', auth, deletePedido);      /* Eliminar uno */

module.exports = router;