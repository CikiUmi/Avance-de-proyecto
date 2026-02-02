const mongoose = require('mongoose');

const cuentaUsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50

  },
  correo: {
    type: String,
    /* Regex para revisar que sea un correo  */
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 100
  },
  password: {
    type: String,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/],
    /* 1 minus, 1 mayus, 1 num, 1 símbolo */
    required: true,
    minlength: 8,
    select: false, /* Para que no se pueda leer */
    maxlength: 100
  },
  rol: {
    type: String,
    required: true,
    enum: ['cliente', 'empleado', 'admin']
    },
  direccion: [
    {
      calle: {
        type: String,
        maxlength: 100
      },
      estado: {
        type: String,
        maxlength: 100
      },
      municipio: {
        type: String,
        maxlength: 100
      },
      asentamiento: {
        type: String,
        maxlength: 100
      },
      numeroInterno: {
        type: String,
        maxlength: 100
      },
      numeroExterno: {
        type: String,
        maxlength: 100
      }
    }
  ],

  lastLogin: {
    type: Date,
    default: null
  },

  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  }

});


module.exports = mongoose.model('CuentaUsuario', cuentaUsuarioSchema);