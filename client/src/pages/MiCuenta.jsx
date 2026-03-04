// client/src/pages/MiCuenta.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import { getCuenta, updateCuenta, getPedidos, getUsuarioLocal, getCarrito } from '../services/api';

const ESTADOS_COLOR = {
  'en proceso': '#e6a817',
  'entregado': '#4caf50',
  'cancelado': 'var(--primary)'
};

function MiCuenta() {
  const navigate = useNavigate();
  const usuarioLocal = getUsuarioLocal();
  const [cuenta, setCuenta] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  // Formulario datos personales
  const [nombre, setNombre] = useState('');
  const [guardandoNombre, setGuardandoNombre] = useState(false);
  const [msgNombre, setMsgNombre] = useState('');

  // Formulario dirección
  const [dir, setDir] = useState({ calle: '', estado: '', municipio: '', asentamiento: '', numeroInterno: '', numeroExterno: '' });
  const [guardandoDir, setGuardandoDir] = useState(false);
  const [msgDir, setMsgDir] = useState('');

  useEffect(() => {
    if (!usuarioLocal) { navigate('/'); return; }

    const cargar = async () => {
      setCargando(true);
      const [datosCuenta, datosPedidos, datosCarrito] = await Promise.all([
        getCuenta(usuarioLocal.id),
        getPedidos(),
        getCarrito(usuarioLocal.id)
      ]);

      if (datosCuenta?.nombre) {
        setCuenta(datosCuenta);
        setNombre(datosCuenta.nombre || '');
        const direccion = datosCuenta.direccion?.[0] || {};
        setDir({
          calle: direccion.calle || '',
          estado: direccion.estado || '',
          municipio: direccion.municipio || '',
          asentamiento: direccion.asentamiento || '',
          numeroInterno: direccion.numeroInterno || '',
          numeroExterno: direccion.numeroExterno || ''
        });
      }

      if (Array.isArray(datosPedidos)) setPedidos(datosPedidos);
      if (datosCarrito?.productos) {
        setCantidadCarrito(datosCarrito.productos.reduce((acc, p) => acc + p.cantidad, 0));
      }
      setCargando(false);
    };
    cargar();
  }, []);

  const handleGuardarNombre = async () => {
    if (!nombre.trim()) { setMsgNombre('El nombre no puede estar vacío'); return; }
    setGuardandoNombre(true);
    const { ok } = await updateCuenta(usuarioLocal.id, { nombre });
    setGuardandoNombre(false);
    setMsgNombre(ok ? '✓ Nombre actualizado' : '* Error al actualizar');
    setTimeout(() => setMsgNombre(''), 3000);
  };

  const handleGuardarDir = async () => {
    setGuardandoDir(true);
    const { ok } = await updateCuenta(usuarioLocal.id, { direccion: [dir] });
    setGuardandoDir(false);
    setMsgDir(ok ? '✓ Dirección actualizada' : '* Error al actualizar');
    setTimeout(() => setMsgDir(''), 3000);
  };

  const handleDirChange = (e) => {
    setDir(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Navbar cantidadCarrito={cantidadCarrito} />

      <main className="cuenta-main">
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '32px' }}>
          Mi Cuenta
        </h1>

        {cargando ? (
          <div className="catalogo-estado"><div className="spinner" /></div>
        ) : (
          <div className="cuenta-layout">
            {/* ── Datos personales ── */}
            <section className="cuenta-card">
              <h2 className="cuenta-card-titulo">Datos personales</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '4px' }}>Correo</p>
              <p style={{ marginBottom: '20px', fontWeight: 500 }}>{cuenta?.correo || usuarioLocal?.correo || '—'}</p>

              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '4px' }}>Rol</p>
              <p style={{ marginBottom: '20px', textTransform: 'capitalize', fontWeight: 500 }}>{cuenta?.rol || '—'}</p>

              <label className="form-label">Nombre</label>
              <div className="input-logReg" style={{ margin: '6px 0 16px' }}>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                />
                <i className="material-icons">person</i>
              </div>

              {msgNombre && (
                <p style={{ color: msgNombre.startsWith('✓') ? 'var(--blanco)' : 'var(--primary)', fontSize: '0.9rem', marginBottom: '10px' }}>
                  {msgNombre}
                </p>
              )}

              <button
                className="log-button blanco-button"
                onClick={handleGuardarNombre}
                disabled={guardandoNombre}
                style={{ width: '100%', padding: '10px' }}
              >
                {guardandoNombre ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </section>

            {/* ── Dirección de envío ── */}
            <section className="cuenta-card">
              <h2 className="cuenta-card-titulo">Dirección de recogida</h2>

              {[
                { label: 'Calle', name: 'calle', placeholder: 'Av. Principal 123' },
                { label: 'Estado', name: 'estado', placeholder: 'Estado de México' },
                { label: 'Municipio', name: 'municipio', placeholder: 'Metepec' },
                { label: 'Asentamiento / Colonia', name: 'asentamiento', placeholder: 'Col. Centro' },
                { label: 'Núm. Exterior', name: 'numeroExterno', placeholder: '42' },
                { label: 'Núm. Interior', name: 'numeroInterno', placeholder: 'A' },
              ].map(campo => (
                <div key={campo.name} style={{ marginBottom: '12px' }}>
                  <label className="form-label">{campo.label}</label>
                  <div className="input-logReg" style={{ margin: '4px 0' }}>
                    <input
                      name={campo.name}
                      value={dir[campo.name]}
                      onChange={handleDirChange}
                      placeholder={campo.placeholder}
                    />
                  </div>
                </div>
              ))}

              {msgDir && (
                <p style={{ color: msgDir.startsWith('✓') ? 'var(--blanco)' : 'var(--primary)', fontSize: '0.9rem', marginBottom: '10px' }}>
                  {msgDir}
                </p>
              )}

              <button
                className="log-button blanco-button"
                onClick={handleGuardarDir}
                disabled={guardandoDir}
                style={{ width: '100%', padding: '10px', marginTop: '6px' }}
              >
                {guardandoDir ? 'Guardando...' : 'Actualizar dirección'}
              </button>
            </section>
          </div>
        )}

        {/* ── Historial de pedidos ── */}
        {!cargando && (
          <section className="cuenta-pedidos">
            <h2 className="cuenta-card-titulo" style={{ marginBottom: '20px' }}>Historial de compras</h2>

            {pedidos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
                <i className="material-icons" style={{ fontSize: '2.5rem' }}>receipt_long</i>
                <p style={{ marginTop: '10px' }}>Aún no tienes pedidos</p>
              </div>
            ) : (
              <div className="pedidos-lista">
                {pedidos.map((pedido, i) => (
                  <div key={pedido._id || i} className="pedido-item">
                    <div className="pedido-item-info">
                      <p className="pedido-num">Pedido #{String(i + 1).padStart(3, '0')}</p>
                      <p className="pedido-fecha" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                        {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                      </p>
                      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '2px' }}>
                        Pago: {pedido.metodoPago}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="pedido-total">${pedido.precioTotal?.toFixed(2)} MXN</p>
                      <span
                        className="pedido-estado"
                        style={{ color: ESTADOS_COLOR[pedido.estado] || 'var(--muted)' }}
                      >
                        {pedido.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <PiePagina />
    </>
  );
}

export default MiCuenta;
