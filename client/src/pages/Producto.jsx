// client/src/pages/Producto.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import LoginDialog from '../components/LoginDialog';
import { getProducto, addAlCarrito, crearCarrito, getCarrito, getUsuarioLocal, esAdmin, deleteProducto } from '../services/api';

function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensajeCarrito, setMensajeCarrito] = useState('');
  const [cargandoCarrito, setCargandoCarrito] = useState(false);
  const [dialogLoginAbierto, setDialogLoginAbierto] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const logueado = !!localStorage.getItem('token');
  const usuario = getUsuarioLocal();
  const admin = esAdmin();

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const data = await getProducto(id);
        if (data?.nombre) {
          setProducto(data);
          if (data.stock?.length > 0) {
            setModeloSeleccionado(data.stock[0]);
            if (data.stock[0].detalles?.length > 0) {
              setTallaSeleccionada(data.stock[0].detalles[0].talla);
            }
          }
        } else {
          setError('Producto no encontrado.');
        }
      } catch {
        setError('Error al cargar el producto.');
      }
      setCargando(false);
    };
    cargar();

    // Cargar cantidad del carrito para el badge
    const cargarCarrito = async () => {
      if (!usuario) return;
      const carrito = await getCarrito(usuario.id);
      if (carrito?.productos) {
        setCantidadCarrito(carrito.productos.reduce((acc, p) => acc + p.cantidad, 0));
      }
    };
    cargarCarrito();
  }, [id]);

  const handleModeloClick = (modelo) => {
    setModeloSeleccionado(modelo);
    setTallaSeleccionada(modelo.detalles?.[0]?.talla || null);
  };

  const existenciasDisponibles = () => {
    if (!modeloSeleccionado || !tallaSeleccionada) return 0;
    const detalle = modeloSeleccionado.detalles?.find(d => d.talla === tallaSeleccionada);
    return detalle?.existencias || 0;
  };

  const handleAgregar = async () => {
    if (!logueado) { setDialogLoginAbierto(true); return; }
    if (!modeloSeleccionado || !tallaSeleccionada) {
      setMensajeCarrito('Selecciona un modelo y talla');
      return;
    }
    setCargandoCarrito(true);
    setMensajeCarrito('');

    // Asegurar que exista carrito
    let carrito = await getCarrito(usuario.id);
    if (!carrito) {
      const { ok } = await crearCarrito(usuario.id);
      if (!ok) { setMensajeCarrito('Error al crear carrito'); setCargandoCarrito(false); return; }
    }

    const { ok, data } = await addAlCarrito(usuario.id, {
      producto: producto._id,
      modelo: modeloSeleccionado.modelo,
      talla: tallaSeleccionada,
      cantidad
    });

    setCargandoCarrito(false);
    if (ok) {
      setMensajeCarrito('✓ Producto añadido al carrito');
      setCantidadCarrito(data.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0);
    } else {
      setMensajeCarrito(data?.mensaje || 'Error al agregar al carrito');
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm('¿Eliminar este producto del catálogo?')) return;
    const { ok } = await deleteProducto(id);
    if (ok) navigate('/catalogo');
  };

  if (cargando) return (
    <>
      <Navbar onAbrirLogin={() => setDialogLoginAbierto(true)} cantidadCarrito={cantidadCarrito} />
      <div className="catalogo-estado" style={{ minHeight: '60vh' }}>
        <div className="spinner" />
        <p style={{ color: 'var(--muted)', marginTop: '16px' }}>Cargando producto...</p>
      </div>
      <PiePagina />
    </>
  );

  if (error) return (
    <>
      <Navbar onAbrirLogin={() => setDialogLoginAbierto(true)} cantidadCarrito={cantidadCarrito} />
      <div className="catalogo-estado" style={{ minHeight: '60vh' }}>
        <i className="material-icons" style={{ fontSize: '3rem', color: 'var(--primary)' }}>error_outline</i>
        <p style={{ color: 'var(--muted)', marginTop: '12px' }}>{error}</p>
        <button className="log-button" style={{ marginTop: '16px', width: 'auto', padding: '8px 24px' }} onClick={() => navigate('/catalogo')}>
          Volver al catálogo
        </button>
      </div>
      <PiePagina />
    </>
  );

  const stock = existenciasDisponibles();

  return (
    <>
      <Navbar onAbrirLogin={() => setDialogLoginAbierto(true)} cantidadCarrito={cantidadCarrito} />

      <main className="producto-main">
        {/* Breadcrumb */}
        <p className="producto-breadcrumb">
          <button className="breadcrumb-btn" onClick={() => navigate('/catalogo')}>← Catálogo</button>
          {' / '}
          <span style={{ color: 'var(--muted)' }}>{producto.nombre}</span>
        </p>

        <div className="producto-layout">
          {/* Columna izquierda: imagen */}
          <div className="producto-imagen-col">
            <div className="producto-imagen-wrapper">
              {modeloSeleccionado?.imagen
                ? <img src={modeloSeleccionado.imagen} alt={producto.nombre} className="producto-imagen" />
                : <div className="producto-sin-imagen"><i className="material-icons">image_not_supported</i></div>
              }
            </div>
            <p className="producto-nombre-mobile">{producto.nombre}</p>
            <p className="producto-categoria-mobile">{producto.categoria}</p>
          </div>

          {/* Columna derecha: info */}
          <div className="producto-info-col">
            <p className="producto-categoria">{producto.categoria}</p>
            <h1 className="producto-nombre">{producto.nombre}</h1>
            <p className="producto-precio">${producto.precio?.toFixed(2)} MXN</p>

            {producto.descripcion && (
              <p className="producto-descripcion">{producto.descripcion}</p>
            )}

            {/* Selección de modelo */}
            {producto.stock?.length > 0 && (
              <div className="producto-seccion">
                <h3 className="producto-seccion-titulo">Modelo / Color</h3>
                <div className="producto-modelos">
                  {producto.stock.map((m, i) => (
                    <button
                      key={i}
                      className={`modelo-btn ${modeloSeleccionado?.modelo === m.modelo ? 'activo' : ''}`}
                      onClick={() => handleModeloClick(m)}
                    >
                      {m.imagen
                        ? <img src={m.imagen} alt={m.modelo} className="modelo-img" />
                        : <span>{m.modelo}</span>
                      }
                      <span className="modelo-nombre">{m.modelo}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selección de talla */}
            {modeloSeleccionado?.detalles?.length > 0 && (
              <div className="producto-seccion">
                <h3 className="producto-seccion-titulo">Talla</h3>
                <div className="producto-tallas">
                  {modeloSeleccionado.detalles.map((d, i) => (
                    <button
                      key={i}
                      className={`talla-btn ${tallaSeleccionada === d.talla ? 'activo' : ''} ${d.existencias === 0 ? 'agotado' : ''}`}
                      onClick={() => d.existencias > 0 && setTallaSeleccionada(d.talla)}
                      disabled={d.existencias === 0}
                    >
                      {d.talla}
                    </button>
                  ))}
                </div>
                {stock === 0 && tallaSeleccionada && (
                  <p style={{ color: 'var(--primary)', fontSize: '0.9rem', marginTop: '6px' }}>Sin existencias en esta talla</p>
                )}
                {stock > 0 && (
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '6px' }}>{stock} disponibles</p>
                )}
              </div>
            )}

            {/* Cantidad */}
            <div className="producto-seccion">
              <h3 className="producto-seccion-titulo">Cantidad</h3>
              <div className="cantidad-control">
                <button className="cantidad-btn" onClick={() => setCantidad(q => Math.max(1, q - 1))}>−</button>
                <span className="cantidad-num">{cantidad}</span>
                <button className="cantidad-btn" onClick={() => setCantidad(q => Math.min(stock || 10, q + 1))}>+</button>
              </div>
            </div>

            {/* Mensaje carrito */}
            {mensajeCarrito && (
              <p style={{
                color: mensajeCarrito.startsWith('✓') ? 'var(--blanco)' : 'var(--primary)',
                background: mensajeCarrito.startsWith('✓') ? 'rgba(255,255,255,0.08)' : 'transparent',
                padding: mensajeCarrito.startsWith('✓') ? '8px 12px' : '0',
                borderRadius: 'var(--radius-small)',
                marginBottom: '12px',
                fontSize: '0.95rem'
              }}>
                {mensajeCarrito}
              </p>
            )}

            {/* Botones acción */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="log-button blanco-button"
                style={{ flex: 1, minWidth: '140px', padding: '12px' }}
                onClick={handleAgregar}
                disabled={cargandoCarrito || stock === 0}
              >
                {cargandoCarrito ? 'Agregando...' : stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
              </button>
              {logueado && (
                <button
                  className="log-button"
                  style={{ flex: 1, minWidth: '140px', padding: '12px' }}
                  onClick={() => navigate('/carrito')}
                >
                  Ver carrito
                </button>
              )}
            </div>

            {/* Acciones admin */}
            {admin && (
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
                <button
                  className="log-button"
                  style={{ padding: '8px 16px', width: 'auto', color: 'var(--primary)', border: '1px solid var(--primary)' }}
                  onClick={handleEliminar}
                >
                  <i className="material-icons" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>delete</i>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {dialogLoginAbierto && (
        <LoginDialog abierto={dialogLoginAbierto} onCerrar={() => setDialogLoginAbierto(false)} />
      )}
      <PiePagina />
    </>
  );
}

export default Producto;
