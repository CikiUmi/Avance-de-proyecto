// client/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio    from './pages/Inicio';
import Catalogo  from './pages/Catalogo';
import Producto  from './pages/Producto';
import MiCuenta  from './pages/MiCuenta';
import Carrito   from './pages/Carrito';

function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Inicio />} />
        <Route path="/catalogo"      element={<Catalogo />} />
        <Route path="/producto/:id"  element={<Producto />} />
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
