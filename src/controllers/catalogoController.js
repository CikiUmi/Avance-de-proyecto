const Catalogo = require('../models/Catalogo');
const userRole = require('../middleware/auth/');

// CREAR
exports.createProducto = async (req, res) => {
  if (userRole === 'admin'){
    try {
      const nuevoProducto = new Catalogo(req.body);
      const productoGuardado = await nuevoProducto.save();
      res.status(200).json(productoGuardado);
    } catch (error) {
      res.status(400).json({ mensaje: 'Error al añadir producto al catálogo: ', error });
    }
  }
};

// READ
/* Todos */
exports.getCatalogo = async (req, res) => {

    let { page, pageSize } = req.query;

  try {
    // Pagina y Tamaño de Página se establecen en 1 y 20 automáticamente
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 20;

    const catalogoProductos = await Catalogo.aggregate([
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      articles: {
        metadata: { totalCount: catalogoProductos[0].metadata[0].totalCount, page, pageSize },
        data: catalogoProductos[0].data,
      },
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener catálogo: ', error });
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
