// client/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio       from './pages/Inicio';
import Catalogo     from './pages/Catalogo';
import Producto     from './pages/Producto';    // ← ruta dinámica
import MiCuenta     from './pages/MiCuenta';
import Carrito      from './pages/Carrito';

// Componente que protege rutas — si no hay token, manda al inicio
function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/"           element={<Inicio />} />
        <Route path="/catalogo"   element={<Catalogo />} />

        {/* Ruta dinámica — :id cambia según el producto */}
        <Route path="/producto/:id" element={<Producto />} />

        {/* Rutas protegidas — requieren login */}
        <Route path="/cuenta" element={
          <RutaProtegida>
            <MiCuenta />
          </RutaProtegida>
        } />
        <Route path="/carrito" element={
          <RutaProtegida>
            <Carrito />
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;