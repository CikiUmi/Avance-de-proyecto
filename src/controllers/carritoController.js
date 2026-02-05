const Carrito = require('../models/Carrito');
const Catalogo = require('../models/Catalogo');
// ======================
// CREAR
// ======================
exports.createCarrito = async (req, res) => {
  try {
    const { usuario } = req.body;

    // Evitar carritos duplicados
    const existeCarrito = await Carrito.findOne({ usuario });
    if (existeCarrito) {
      return res.status(400).json({ mensaje: 'El carrito ya existe para este usuario' });
    }

    const nuevoCarrito = new Carrito({
      usuario,
      productos: [],
      total: 0
    });

    const carritoGuardado = await nuevoCarrito.save();
    res.status(200).json(carritoGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear carrito',
      error
    });
  }
};


// ======================
// AÑADIR PRODUCTO
// ======================
exports.updateProductosCarrito = async (req, res) => {
  try {
    const { userID } = req.params;
    const { producto, cantidad, modelo, talla } = req.body;

    if (!producto || !cantidad || !modelo ||!talla ) {
      return res.status(400).json({ mensaje: 'Producto, modelo, talla y cantidad son obligatorios' });
    }

    const carrito = await Carrito.findOne({ usuario: userID });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    //Buscar el precio en catálogo
    const productoDB = await Catalogo.findById(producto);
    if (!productoDB) {
      return res.status(404).json({ mensaje: 'Producto no existe en catálogo' });
    }

    const costoUnitario = productoDB.precio;
    const subtotal = cantidad * costoUnitario;

    // Ver si el producto ya existe
    const productoExistente = carrito.productos.find(
      p => p.producto.toString() === producto &&
        p.modelo === modelo &&
        p.talla === talla
    );

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
      productoExistente.subtotal =
        productoExistente.cantidad * productoExistente.costoUnitario;
    } else {
      carrito.productos.push({
        producto,
        modelo,
        talla,
        cantidad,
        subtotal
      });
    }

    // Recalcular total
    carrito.total = carrito.productos.reduce(
      (acc, p) => acc + p.subtotal,
      0
    );

    await carrito.save();
    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al añadir producto al carrito',
      error
    });
  }
};


// ======================
// READ
// ======================
exports.getCarrito = async (req, res) => {
  try {
    const { userID } = req.params;

    const carrito = await Carrito.findOne({ usuario: userID }).populate('productos.producto');

    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener carrito',
      error
    });
  }
};


// ======================
// UPDATE (reemplazar productos)
// ======================
exports.updateCarrito = async (req, res) => {
  try {
    const { userID } = req.params;
    const { productos } = req.body;

    const total = productos.reduce(
      (acc, p) => acc + p.subtotal,
      0
    );

    const carritoActualizado = await Carrito.findOneAndUpdate(
      { usuario: userID },
      { productos, total },
      { new: true }
    );

    if (!carritoActualizado) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(200).json(carritoActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar carrito',
      error
    });
  }
};


// ======================
// DELETE
// ======================
exports.deleteCarrito = async (req, res) => {
  try {
    const { userID } = req.params;

    const carritoEliminado = await Carrito.findOneAndDelete({ usuario: userID });
    if (!carritoEliminado) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(200).json({ mensaje: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar carrito',
      error
    });
  }
};
