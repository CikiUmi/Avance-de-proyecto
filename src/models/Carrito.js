const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaUsuario', //agarra el id
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
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


});

module.exports = mongoose.model('Carrito', carritoSchema);
