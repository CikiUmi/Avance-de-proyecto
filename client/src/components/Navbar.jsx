// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUsuarioLocal } from '../services/api';

function Navbar({ onAbrirLogin }) {
  const navigate  = useNavigate();
  const usuario   = getUsuarioLocal();
  const logueado  = !!localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (

  <div id="navbarDiv">
    <header className="navbar">
    <Link to= "/" id="logoNavBar">
      <h1 className="logo">Sir LucXs StudiO</h1>
    </Link>

      <nav>
      <Link to="/catalogo" className = "navBarTitles">Catálogo</Link>

            <Link to="/carrito">
              <i className="material-icons" id="iconoCarrito">shopping_cart</i>
              <span className="badge">0</span>
            </Link>

          {logueado ? (
            <span style={{ gap: '8px' }}>
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
            // Si no está logueado, muestra botón que abre el dialog
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
