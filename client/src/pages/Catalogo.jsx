// client/src/pages/Catalogo.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import LoginDialog from '../components/LoginDialog';
import { getCatalogo, getCarrito, esAdmin, createProducto, getUsuarioLocal } from '../services/api';
import placeholder from '../assets/images/placeholder.png';


const CATEGORIAS = ['Camisa','Playera','Sudadera','Calzado','Accesorio','Pantalón','Falda','Vestido','Chamarra','Otro'];
const TALLAS = ['XS','S','M','L','XL','XXL','U'];

// ── Popup para crear producto (solo admin) ──
function DialogCrearProducto({ onCerrar, onCreado }) {
  const dialogRef = useRef(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Playera',
    precio: '',
    descripcion: '',
    modelo: '',
    imagen: '',
    talla: 'M',
    existencias: ''
  });

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleCambio = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.precio || !form.modelo || !form.imagen || !form.existencias) {
      setError('* Completa todos los campos obligatorios');
      return;
    }
    setCargando(true);
    const payload = {
      nombre: form.nombre,
      categoria: form.categoria,
      precio: parseFloat(form.precio),
      descripcion: form.descripcion,
      stock: [{
        modelo: form.modelo,
        imagen: form.imagen,
        detalles: [{ talla: form.talla, existencias: parseInt(form.existencias) }]
      }]
    };
    const { ok, data } = await createProducto(payload);
    setCargando(false);
    if (ok) {
      onCreado();
      onCerrar();
    } else {
      setError(data?.mensaje || '* Error al crear el producto');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onCerrar();
  };

  return (
    <dialog ref={dialogRef} onClick={handleBackdropClick}>
      <div className="tarjetaLogReg" style={{ width: 'min(90vw, 560px)', textAlign: 'left' }}>
        <form onSubmit={e => e.preventDefault()} style={{ width: '100%' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Agregar producto</h2>

          <div className="form-grid-2">
            <div>
              <label className="form-label">Nombre *</label>
              <div className="input-logReg">
                <input name="nombre" value={form.nombre} onChange={handleCambio} placeholder="Nombre del producto" />
              </div>
            </div>
            <div>
              <label className="form-label">Categoría *</label>
              <select name="categoria" value={form.categoria} onChange={handleCambio} className="select-admin">
                {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div>
              <label className="form-label">Precio (MXN) *</label>
              <div className="input-logReg">
                <input name="precio" type="number" min="0" value={form.precio} onChange={handleCambio} placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="form-label">Modelo / Color *</label>
              <div className="input-logReg">
                <input name="modelo" value={form.modelo} onChange={handleCambio} placeholder="Ej: azul marino" />
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">URL de imagen *</label>
            <div className="input-logReg">
              <input name="imagen" value={form.imagen} onChange={handleCambio} placeholder="https://..." />
            </div>
          </div>

          <div className="form-grid-2">
            <div>
              <label className="form-label">Talla inicial</label>
              <select name="talla" value={form.talla} onChange={handleCambio} className="select-admin">
                {TALLAS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Existencias *</label>
              <div className="input-logReg">
                <input name="existencias" type="number" min="0" value={form.existencias} onChange={handleCambio} placeholder="0" />
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleCambio}
              placeholder="Descripción del producto..."
              className="textarea-admin"
              rows={3}
            />
          </div>

          {error && <p className="errorTextCuenta" style={{ display: 'block', marginTop: '8px' }}>{error}</p>}

          <div className="wrapper-button" style={{ marginTop: '24px' }}>
            <button className="log-button muted-button" type="button" onClick={onCerrar}>Cancelar</button>
            <button className="log-button blanco-button" type="button" onClick={handleSubmit} disabled={cargando}>
              {cargando ? 'Guardando...' : 'Guardar producto'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

// ── Tarjeta de producto ──
function TarjetaProducto({ producto }) {
  const imagenPrincipal = producto.stock?.[0]?.imagen;
  return (
    <Link to={`/producto/${producto._id}`} className="tarjeta-producto">
      <div className="tarjeta-img-wrapper">
        <img src={imagenPrincipal} alt={producto.nombre} className="tarjeta-img" />
      </div>
      <div className="tarjeta-info">
        <p className="tarjeta-categoria">{producto.categoria}</p>
        <h3 className="tarjeta-nombre">{producto.nombre}</h3>
        <p className="tarjeta-precio">${producto.precio?.toFixed(2)} MXN</p>
      </div>
    </Link>
  );
}

// ── Página Catálogo ──
function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dialogLoginAbierto, setDialogLoginAbierto] = useState(false);
  const [dialogCrearAbierto, setDialogCrearAbierto] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const navigate = useNavigate();
  const admin = esAdmin();
  const usuario = getUsuarioLocal();
  const PAGE_SIZE = 12;

  const cargarProductos = async (p = 1) => {
    setCargando(true);
    setError('');
    try {
      const data = await getCatalogo(p, PAGE_SIZE);
      if (data?.articles?.data) {
        setProductos(data.articles.data);
        setTotalCount(data.articles.metadata?.totalCount || 0);
      } else {
        setError('No se pudo cargar el catálogo.');
      }
    } catch {
      setError('Error de red al cargar el catálogo.');
    }
    setCargando(false);
  };

  const cargarCarrito = async () => {
    if (!usuario) return;
    const carrito = await getCarrito(usuario.id);
    if (carrito?.productos) {
      setCantidadCarrito(carrito.productos.reduce((acc, p) => acc + p.cantidad, 0));
    }
  };

  useEffect(() => {
    cargarProductos(pagina);
    cargarCarrito();
  }, [pagina]);

  const totalPaginas = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <Navbar
        onAbrirLogin={() => setDialogLoginAbierto(true)}
        cantidadCarrito={cantidadCarrito}
      />

      <main className="catalogo-main">
        {/* Encabezado */}
        <div className="catalogo-header">
          <div>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
              Catálogo
            </h1>
            {totalCount > 0 && (
              <p style={{ color: 'var(--muted)', marginTop: '4px' }}>{totalCount} productos</p>
            )}
          </div>
          {admin && (
            <button
              className="log-button blanco-button btn-admin-crear"
              onClick={() => setDialogCrearAbierto(true)}
            >
              <i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }}>add</i>
              Agregar producto
            </button>
          )}
        </div>

        {/* Estados */}
        {cargando && (
          <div className="catalogo-estado">
            <div className="spinner" />
            <p style={{ color: 'var(--muted)', marginTop: '16px' }}>Cargando productos...</p>
          </div>
        )}

        {!cargando && error && (
          <div className="catalogo-estado">
            <i className="material-icons" style={{ fontSize: '3rem', color: 'var(--primary)' }}>error_outline</i>
            <p style={{ color: 'var(--muted)', marginTop: '12px' }}>{error}</p>
            <button className="log-button" style={{ marginTop: '16px', width: 'auto', padding: '8px 24px' }} onClick={() => cargarProductos(pagina)}>
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && productos.length === 0 && (
          <div className="catalogo-estado">
            <i className="material-icons" style={{ fontSize: '3rem', color: 'var(--muted)' }}>inventory_2</i>
            <p style={{ color: 'var(--muted)', marginTop: '12px' }}>No hay productos disponibles.</p>
          </div>
        )}

        {/* Grid de productos */}
        {!cargando && productos.length > 0 && (
          <div className="catalogo-grid">
            {productos.map(p => (
              <TarjetaProducto key={p._id} producto={p} />
            ))}
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="catalogo-paginacion">
            <button
              className="log-button"
              disabled={pagina === 1}
              onClick={() => setPagina(p => p - 1)}
              style={{ width: 'auto', padding: '8px 20px' }}
            >
              ← Anterior
            </button>
            <span style={{ color: 'var(--muted)' }}>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              className="log-button"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(p => p + 1)}
              style={{ width: 'auto', padding: '8px 20px' }}
            >
              Siguiente →
            </button>
          </div>
        )}
      </main>

      {dialogLoginAbierto && (
        <LoginDialog abierto={dialogLoginAbierto} onCerrar={() => setDialogLoginAbierto(false)} />
      )}

      {dialogCrearAbierto && (
        <DialogCrearProducto
          onCerrar={() => setDialogCrearAbierto(false)}
          onCreado={() => cargarProductos(pagina)}
        />
      )}

      <PiePagina />
    </>
  );
}

export default Catalogo;
