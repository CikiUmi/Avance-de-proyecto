const mongoose = require('mongoose');

const catalogoSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minlenght: 5
  },

  tipo: {
    type: String,
    required: true,
    trim: true
  },

  talla: {
    type: String,
    enum: ['XS','S','M','L','XL','XXL'],
    required: true
  },

  precio: {
    type: Number,
    required: true,
    min: 0
  },

  existencias: {
    type: Number,
    required: true,
    min: 0
  },

  costoUnitario: {
    type: Number,
    required: true,
    min: 0
  },

  imagen: {
    type: String,   // link :D
    required: true
  },

  descripcion: {
    type: String,
    trim: true,
    maxlength: 500

  },

  color: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Catalogo', catalogoSchema);
