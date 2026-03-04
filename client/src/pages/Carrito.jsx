// client/src/pages/Carrito.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import { getCarrito, updateCarrito, vaciarCarrito, crearPedido, getUsuarioLocal } from '../services/api';

const METODOS_PAGO = ['débito','crédito','transferencia','depósito'];

function Carrito() {
  const navigate = useNavigate();
  const usuario = getUsuarioLocal();
  const [carrito, setCarrito] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [metodoPago, setMetodoPago] = useState('débito');
  const [cargandoPedido, setCargandoPedido] = useState(false);
  const [mensajePedido, setMensajePedido] = useState('');
  const [pedidoExito, setPedidoExito] = useState(false);

  const cargarCarrito = async () => {
    if (!usuario) { navigate('/'); return; }
    setCargando(true);
    try {
      const data = await getCarrito(usuario.id);
      setCarrito(data);
    } catch {
      setError('Error al cargar el carrito.');
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  // Cambiar cantidad de un ítem
  const handleCambiarCantidad = async (index, delta) => {
    const productos = [...carrito.productos];
    const item = { ...productos[index] };
    const nuevaCantidad = item.cantidad + delta;
    if (nuevaCantidad < 1) return;

    // Recalcular subtotal usando precio del producto populado
    const precio = item.producto?.precio || 0;
    item.cantidad = nuevaCantidad;
    item.subtotal = nuevaCantidad * precio;
    productos[index] = item;

    const { ok, data } = await updateCarrito(usuario.id, productos.map(p => ({
      producto: p.producto?._id || p.producto,
      modelo: p.modelo,
      talla: p.talla,
      cantidad: p.cantidad,
      subtotal: p.subtotal
    })));
    if (ok) setCarrito(data);
  };

  // Eliminar un ítem del carrito
  const handleEliminarItem = async (index) => {
    const productos = carrito.productos.filter((_, i) => i !== index);
    const { ok, data } = await updateCarrito(usuario.id, productos.map(p => ({
      producto: p.producto?._id || p.producto,
      modelo: p.modelo,
      talla: p.talla,
      cantidad: p.cantidad,
      subtotal: p.subtotal
    })));
    if (ok) setCarrito(data);
  };

  // Realizar pedido
  const handlePedido = async () => {
    if (!carrito?.productos?.length) return;
    setCargandoPedido(true);
    setMensajePedido('');
    const { ok, data } = await crearPedido(usuario.id, metodoPago);
    setCargandoPedido(false);
    if (ok) {
      setPedidoExito(true);
      setMensajePedido('¡Pedido realizado con éxito!');
      // Recargar carrito (quedará vacío después del pedido)
      await cargarCarrito();
    } else {
      setMensajePedido(data?.mensaje || 'Error al realizar el pedido');
    }
  };

  const cantidadTotal = carrito?.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0;

  return (
    <>
      <Navbar cantidadCarrito={cantidadTotal} />

      <main className="carrito-main">
        <div className="carrito-header">
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>Mi pedido</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {carrito?.productos?.length > 0 && (
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                {cantidadTotal} artículo{cantidadTotal !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {cargando && (
          <div className="catalogo-estado">
            <div className="spinner" />
            <p style={{ color: 'var(--muted)', marginTop: '16px' }}>Cargando tu carrito...</p>
          </div>
        )}

        {!cargando && error && (
          <div className="catalogo-estado">
            <p style={{ color: 'var(--primary)' }}>{error}</p>
          </div>
        )}

        {!cargando && !error && (!carrito || carrito.productos?.length === 0) && (
          <div className="catalogo-estado" style={{ minHeight: '40vh' }}>
            <i className="material-icons" style={{ fontSize: '3.5rem', color: 'var(--muted)' }}>shopping_cart</i>
            <p style={{ color: 'var(--muted)', marginTop: '12px', fontSize: '1.1rem' }}>Tu carrito está vacío</p>
            <button
              className="log-button blanco-button"
              style={{ marginTop: '20px', width: 'auto', padding: '10px 28px' }}
              onClick={() => navigate('/catalogo')}
            >
              Explorar catálogo
            </button>
          </div>
        )}

        {!cargando && carrito?.productos?.length > 0 && (
          <div className="carrito-layout">
            {/* Lista de productos */}
            <div className="carrito-lista">
              {carrito.productos.map((item, i) => {
                const prod = item.producto;
                const nombre = prod?.nombre || 'Producto';
                const imagen = prod?.stock?.[0]?.imagen || '/resources/placeholder.jpg';
                const precio = prod?.precio || 0;

                return (
                  <div key={i} className="carrito-item">
                    <div className="carrito-item-img">
                      <img src={imagen} alt={nombre} />
                    </div>
                    <div className="carrito-item-info">
                      <h3 className="carrito-item-nombre">{nombre}</h3>
                      <p className="carrito-item-meta">
                        Modelo: <span>{item.modelo}</span> · Talla: <span>{item.talla}</span>
                      </p>
                      <p className="carrito-item-unitario">Costo unitario: ${precio.toFixed(2)} MXN</p>
                      <div className="carrito-item-acciones">
                        <div className="cantidad-control">
                          <button className="cantidad-btn" onClick={() => handleCambiarCantidad(i, -1)}>−</button>
                          <span className="cantidad-num">{item.cantidad}</span>
                          <button className="cantidad-btn" onClick={() => handleCambiarCantidad(i, 1)}>+</button>
                        </div>
                        <button className="carrito-eliminar-btn" onClick={() => handleEliminarItem(i)} title="Eliminar">
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    </div>
                    <div className="carrito-item-subtotal">
                      <p>${item.subtotal?.toFixed(2)} MXN</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel de resumen */}
            <div className="carrito-resumen">
              <div className="carrito-resumen-total">
                <span>Total:</span>
                <span className="carrito-total-num">${carrito.total?.toFixed(2)} MXN</span>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Método de pago</label>
                <select
                  value={metodoPago}
                  onChange={e => setMetodoPago(e.target.value)}
                  className="select-admin"
                  style={{ width: '100%' }}
                >
                  {METODOS_PAGO.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              {mensajePedido && (
                <p style={{
                  marginTop: '12px',
                  color: pedidoExito ? 'var(--blanco)' : 'var(--primary)',
                  background: pedidoExito ? 'rgba(255,255,255,0.08)' : 'transparent',
                  padding: pedidoExito ? '8px 12px' : '0',
                  borderRadius: 'var(--radius-small)',
                  fontSize: '0.95rem'
                }}>
                  {mensajePedido}
                </p>
              )}

              <div className="carrito-botones">
                <button
                  className="log-button muted-button"
                  onClick={() => navigate('/catalogo')}
                >
                  Regresar
                </button>
                <button
                  className="log-button blanco-button"
                  onClick={handlePedido}
                  disabled={cargandoPedido}
                >
                  {cargandoPedido ? 'Procesando...' : 'Aceptar y Pagar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <PiePagina />
    </>
  );
}

export default Carrito;
