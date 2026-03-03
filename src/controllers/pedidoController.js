const Pedido = require('../models/Pedido');
const Carrito = require('../models/Carrito')
// CREAR
//sacar el total, borrar el carrito
exports.createPedido = async (req, res) => {
  try {
    const { userID } = req.params;
    const { metodoPago } = req.body;

    // 1. Buscar carrito
    const carrito = await Carrito.findOne({ usuario: userID });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    if (!carrito.productos || carrito.productos.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }

    if (!metodoPago) {
      return res.status(400).json({ mensaje: 'El método de pago es obligatorio' });
    }

    // 2. Crear pedido

    /* FUNCIÓN PARA BORRAR Y ACTUALIZAR STOCK */

    const actualizaciones = [];

    for (const item of carrito.productos) {
      const productoEnCatalogo = await Catalogo.findById(item.producto);

      if (!productoEnCatalogo) {
        return res.status(404).json({
          mensaje: `Producto no encontrado en catálogo: ${item.producto}`
        });
      }

      // Buscar el modelo correcto dentro del stock
      const modeloEncontrado = productoEnCatalogo.stock.find(
        s => s.modelo === item.modelo
      );

      if (!modeloEncontrado) {
        return res.status(400).json({
          mensaje: `Modelo "${item.modelo}" no encontrado en el producto "${productoEnCatalogo.nombre}"`
        });
      }

      // Buscar la talla correcta dentro del modelo
      const tallaEncontrada = modeloEncontrado.detalles.find(
        d => d.talla === item.talla
      );

      if (!tallaEncontrada) {
        return res.status(400).json({
          mensaje: `Talla "${item.talla}" no disponible en el modelo "${item.modelo}"`
        });
      }

      // Verificar que haya suficiente stock
      if (tallaEncontrada.existencias < item.cantidad) {
        return res.status(400).json({
          mensaje: `Stock insuficiente para "${productoEnCatalogo.nombre}" - modelo: ${item.modelo}, talla: ${item.talla}. Disponible: ${tallaEncontrada.existencias}, solicitado: ${item.cantidad}`
        });
      }

      // Guardar referencia para actualizar después
      actualizaciones.push({ productoEnCatalogo, modeloEncontrado, tallaEncontrada, cantidad: item.cantidad });
    }

    // 3. Todo está bien — descontar stock
    for (const { productoEnCatalogo, tallaEncontrada, cantidad } of actualizaciones) {
      tallaEncontrada.existencias -= cantidad;
      await productoEnCatalogo.save();
    }

    // 4. Crear y guardar pedido
    const nuevoPedido = new Pedido({
      user: carrito.usuario,
      productos: carrito.productos,
      precioTotal: carrito.total,
      metodoPago
    });

    const pedidoGuardado = await nuevoPedido.save();

    // 5. Borrar carrito
    await Carrito.deleteOne({ usuario: userID });

    res.status(201).json(pedidoGuardado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar pedido', error });
  }
};
// READ
/* Todos */
exports.getAllPedidos = async (req, res) => {
  try {
    const allPedidos = await Pedido.find();
    res.status(200).json(allPedidos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener pedidos: ', error });
  }
};

/* Unooooo */
exports.getPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener pedido',
      error
    });
  }
};

// UPDATE
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoActualizar = await Pedido.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!pedidoActualizar) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json(pedidoActualizar);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar pedido',
      error
    });
  }
};

// DELETE
exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoEliminado = await Pedido.findByIdAndDelete(id);
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar pedido',
      error
    });
  }
};


