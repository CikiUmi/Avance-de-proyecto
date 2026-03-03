// client/src/pages/Inicio.jsx
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import LoginDialog from '../components/LoginDialog';

function MiCuenta() {
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar onAbrirLogin={() => setDialogAbierto(true)} />
  <h1 style={{ padding: '40px', color: 'var(--blanco)' }}>Mi Cuenta — próximamente</h1>;

      <PiePagina />
    </>
  );

}
export default MiCuenta;