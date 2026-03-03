// client/src/pages/Inicio.jsx
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import LoginDialog from '../components/LoginDialog';

function Inicio() {
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar onAbrirLogin={() => setDialogAbierto(true)} />

      <main style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <h1 style={{ fontFamily: 'Cinzel Decorative', fontSize: 'clamp(2rem, 6vw, 4rem)', textAlign: 'center' }}>
          Sir LucXs StudiO
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '2rem' }}>
          Plantilla de Página
        </p>
      </main>

      {/* El dialog de login/registro */}
      <LoginDialog
        abierto={dialogAbierto}
        onCerrar={() => setDialogAbierto(false)}
      />

      <PiePagina />
    </>
  );
}

export default Inicio;