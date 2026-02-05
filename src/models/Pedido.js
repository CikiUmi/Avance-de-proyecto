const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaUsuario',               // id de usuario
    required: true
  },

  estado: {
    type: String,
    enum: ['en proceso', 'entregado', 'cancelado'],
    default: 'en proceso',
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId, //id
        ref: 'Catalogo',
        required: true
      },
       modelo: {
        type: String,
        required: true
      },

      talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
      },

      cantidad: {
        type: Number,
        required: true,
        min: 1
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

  fecha: {
    type: Date,
    default: Date.now,
    required: true
  }
});


module.exports = mongoose.model('Pedido', pedidoSchema);