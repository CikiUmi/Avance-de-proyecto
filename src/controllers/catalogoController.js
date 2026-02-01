const Catalogo = require('../models/Catalogo');

// CREAR
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Catalogo(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al añadir producto al catálogo: ', error });
  }
};

// READ
/* Todos */
exports.getCatalogo = async (req, res) => {
  try {
    const catalogoProductos = await Catalogo.find();
    res.status(201).json(catalogoProductos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener catálogo: ', error });
  }
};

/* Uno */
exports.getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Catalogo.findById(id);
        if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener producto',
      error
    });
  }
};


// UPDATE
exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizar = await Catalogo.findByIdAndUpdate(id, req.body, {new:true, runValidators: true });
        if (!productoActualizar) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json(productoActualizar);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener producto',
      error
    });
  }
};

// DELETE
exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoEliminado = await Catalogo.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar producto',
      error
    });
  }
};
