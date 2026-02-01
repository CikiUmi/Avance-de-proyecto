const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaUsuario', //agarra el id
    required: true
  },

  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalogo',
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

  total: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('Carrito', carritoSchema);
