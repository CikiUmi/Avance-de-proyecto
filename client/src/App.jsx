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
        {/* Pública — página de inicio con login */}
        <Route path="/"                element={<Inicio />} />

        {/* Pública — el catálogo se puede ver sin login */}
        <Route path="/catalogo"        element={<Catalogo />} />

        {/* Dinámica — detalle de un producto por su ID */}
        <Route path="/producto/:id"    element={<Producto />} />

        {/* Protegidas — requieren token */}
        <Route path="/carrito" element={
          <RutaProtegida><Carrito /></RutaProtegida>
        } />
        <Route path="/cuenta" element={
          <RutaProtegida><MiCuenta /></RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;