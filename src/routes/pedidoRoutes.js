const express = require('express');
const router = express.Router();

const {
  createPedido,
  updatePedido,
  getPedido,
  getAllPedidos,
  deletePedido
} = require('../controllers/pedidoController');

router.post('/:id', createPedido);   /* Crear pedido */
router.put('/:id', updatePedido);     /* para editar el pedido */
router.get('/:id', getPedido);      /* Leer uno */
router.get('/', getAllPedidos);      /* Leer todos */
router.delete('/:id', deletePedido);      /* Eliminar uno */

module.exports = router;