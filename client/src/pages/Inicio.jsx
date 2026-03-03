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
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>
          Proyecto para Desarrollo Fullstack
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          <button
            className="log-button"
            style={{ padding: '12px 32px', fontSize: '1rem' }}
            onClick={() => setDialogAbierto(true)}
          >
            Iniciar sesión
          </button>
          <button
            className="log-button blanco-button"
            style={{ padding: '12px 32px', fontSize: '1rem' }}
            onClick={() => { setDialogAbierto(true); }}
          >
            Registrarse
          </button>
        </div>
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