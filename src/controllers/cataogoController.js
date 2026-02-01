const Catalogo = require('../models/Catalogo');

// CREAR
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Catalogo.create(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al añadir producto al catálogo: ', error });
  }ta
}

// READ
/* Todos */
exports.getCatalogo = async (req, res) => {
  try {
     const catalogoProductos = await Catalogo.find();
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(catalogoProductos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener catálogo: ', error });
  }
}

/* Uno */
exports.getProducto = async (req, res) => {
  try {
     const catalogoProductos = await Catalogo.find();
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(catalogoProductos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener catálogo: ', error });
  }
}

// UPDATE


// DELETE



  createProducto,
  getCatalogo,
  getProducto,
  updateProducto,
  deleteProducto