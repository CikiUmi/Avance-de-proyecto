const mongoose = require('mongoose');

const catalogoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minlength: 5
  },

  categoria: {
    type: String,
    enum: ['Camisa', 'Playera', 'Sudadera', 'Calzado', 'Accesorio', 'Pantalón', 'Falda', 'Vestido', 'Chamarra', 'Otro']
  },

  precio: {
    type: Number,
    required: true,
    min: 0
  },

  descripcion: {
    type: String,
    trim: true,
    maxlength: 500

  },

  stock: [
    {
      modelo: { //antes se llamaba color..-.
        type: String,
        required: true,
        trim: true
      },
      imagen: {
        type: String,   // link :D
        required: true
      },
      detalles: [
        {
          talla: {
            type: String,
            enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          },
          existencias: {
            type: Number,
            required: true,
            min: 0
          }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Catalogo', catalogoSchema);
