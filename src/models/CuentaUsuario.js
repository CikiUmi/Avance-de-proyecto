const mongoose = require('mongoose');

const cuentaUsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    /*  */
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  rol: {
    required: true,
    enum: ['cliente', 'empleado', 'admin'],
    default: 'cliente',
  },
  direccion: [
    {
     calle:{
      required
     }
    }
  ],
  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  }

});


module.exports = mongoose.model('CuentaUsuario', cuentaUsuarioSchema);