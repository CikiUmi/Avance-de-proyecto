const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaUsuario',               // id de usuario
    required: true
  },

  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalogo',        // referencia a la colección products
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      },
      costoUnitario: {
        type: Number,
        required: true,
        min: 0
      },
      subtotal: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],

  precioTotal: {
    type: Number,
    required: true,
    min: 0
  },

  descuento: {
    type: Number,
    default: 0,
    min: 0
  },

  metodoPago: {
    type: String,
    enum: ['débito', 'crédito', 'transferencia', 'depósito'],
    required: true
  },

  estado: {
    type: String,
    enum: ['en proceso','entregado','cancelado'],
    default: 'en proceso'
  },

  fecha: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Pedido', productSchema);