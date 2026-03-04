// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUsuarioLocal } from '../services/api';

function Navbar({ onAbrirLogin, cantidadCarrito = 0 }) {
  const navigate  = useNavigate();
  const usuario   = getUsuarioLocal();
  const logueado  = !!localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Si no está logueado, el ícono del carrito abre el login
  const handleCarritoClick = (e) => {
    if (!logueado) {
      e.preventDefault();
      if (onAbrirLogin) onAbrirLogin();
    }
  };

  return (
    <div id="navbarDiv">
      <header className="navbar">
        <Link to="/" id="logoNavBar">
          <h1 className="logo">Sir LucXs StudiO</h1>
        </Link>

        <nav>
          <Link to="/catalogo" className="navBarTitles">Catálogo</Link>
          <Link to="#" className="navBarTitles">Sobre nosotros</Link>

          {/* Ícono carrito — siempre visible, comportamiento según sesión */}
          <Link
            to={logueado ? '/carrito' : '#'}
            onClick={handleCarritoClick}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
          >
            <i className="material-icons" id="iconoCarrito">shopping_cart</i>
            {logueado && cantidadCarrito > 0 && (
              <span className="badge">{cantidadCarrito}</span>
            )}
          </Link>

          {logueado ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/cuenta">
                <i className="material-icons" id="iconoUser">person</i>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  fontSize: '0.8rem',
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
              >
                Salir
              </button>
            </span>
          ) : (
            <button
              onClick={onAbrirLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                marginLeft: '20px'
              }}
            >
              <i className="material-icons" id="iconoUser">person</i>
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
