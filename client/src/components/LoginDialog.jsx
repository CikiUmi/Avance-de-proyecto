// client/src/components/LoginDialog.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';

// vista: 'login' | 'registro'
function LoginDialog({ abierto, onCerrar }) {
  const [vista, setVista] = useState('login');
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  // ─── Abrir / cerrar el <dialog> nativo ────────
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (abierto && !el.open) el.showModal();
    if (!abierto && el.open) el.close();
  }, [abierto]);

  // Cerrar al click en el backdrop
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onCerrar();
  };

  return (
    <dialog ref={dialogRef} onClick={handleBackdropClick}>
      {vista === 'login'
        ? <FormLogin
            onCerrar={onCerrar}
            onIrRegistro={() => setVista('registro')}
            navigate={navigate}
          />
        : <FormRegistro
            onCerrar={onCerrar}
            onIrLogin={() => setVista('login')}
          />
      }
    </dialog>
  );
}

// ══════════════════════════════════════════════
// FORMULARIO DE LOGIN
// ══════════════════════════════════════════════
function FormLogin({ onCerrar, onIrRegistro, navigate }) {
  const [correo, setCorreo]     = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores]   = useState({});
  const [cargando, setCargando] = useState(false);

  const validar = () => {
    const e = {};
    if (!correo)   e.correo   = '* Se requiere un correo';
    if (!password) e.password = '* Se requiere una contraseña';
    return e;
  };

  const handleLogin = async () => {
    const e = validar();
    if (Object.keys(e).length > 0) { setErrores(e); return; }

    setCargando(true);
    const { ok, data } = await login(correo, password);
    setCargando(false);

    if (ok) {
      onCerrar();
      navigate('/catalogo'); // redirige al catálogo tras login exitoso
    } else {
      // Mostrar el error que manda el backend
      const msg = data.message || 'Credenciales inválidas';
      if (msg.toLowerCase().includes('contrase')) {
        setErrores({ password: '* Contraseña errónea' });
      } else {
        setErrores({ correo: '* La cuenta no existe' });
      }
    }
  };

  return (
    <div className="areaDelLogin tarjetaLogReg">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Iniciar sesión</h2>

        {/* Correo */}
        <div>
          <div className="input-logReg">
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => { setCorreo(e.target.value); setErrores({}); }}
              autoComplete="off"
            />
            <i className="material-icons">mail</i>
          </div>
          {errores.correo && <p className="errorTextCuenta" style={{ display: 'block' }}>{errores.correo}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <div className="input-logReg">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrores({}); }}
              autoComplete="off"
            />
            <i className="material-icons">lock</i>
          </div>
          {errores.password && <p className="errorTextCuenta" style={{ display: 'block' }}>{errores.password}</p>}
        </div>

        {/* Botones */}
        <div className="wrapper-button">
          <button className="log-button muted-button" type="button" onClick={onCerrar}>
            Cancelar
          </button>
          <button
            className="log-button blanco-button"
            type="button"
            id="entrarBoton"
            onClick={handleLogin}
            disabled={cargando}
          >
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <button className="log-button-a" type="button" onClick={onIrRegistro}>
          Aún no tengo una cuenta
        </button>
      </form>
    </div>
  );
}

// ══════════════════════════════════════════════
// FORMULARIO DE REGISTRO
// ══════════════════════════════════════════════
function FormRegistro({ onCerrar, onIrLogin }) {
  const [nombre, setNombre]     = useState('');
  const [correo, setCorreo]     = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores]   = useState({});
  const [cargando, setCargando] = useState(false);
  const [exito, setExito]       = useState(false);

  const validarPassword = (pass) => {
    const e = {};
    if (!pass)                        e.vacio    = '* Se requiere una contraseña';
    else if (!/[A-Z]/.test(pass))     e.mayus    = '* Utiliza al menos una Mayúscula';
    else if (!/[a-z]/.test(pass))     e.minus    = '* Utiliza al menos una Minúscula';
    else if (!/[0-9]/.test(pass))     e.numero   = '* Utiliza al menos un Número';
    else if (!/[\W_]/.test(pass))     e.simbolo  = '* Utiliza al menos un Símbolo';
    return e;
  };

  const validar = () => {
    const e = {};
    if (!nombre) e.nombre = '* Se requiere un nombre';
    if (!correo) e.correo = '* Se requiere un correo';
    const passErr = validarPassword(password);
    if (Object.keys(passErr).length > 0) e.password = Object.values(passErr)[0];
    return e;
  };

  const handleRegistro = async () => {
    const e = validar();
    if (Object.keys(e).length > 0) { setErrores(e); return; }

    setCargando(true);
    const { ok, data } = await register(nombre, correo, password);
    setCargando(false);

    if (ok) {
      setExito(true); // mostrar mensaje de éxito
      setTimeout(() => { onIrLogin(); setExito(false); }, 2000);
    } else {
      const msg = data.message || '';
      if (msg.includes('ya existe') || msg.includes('409')) {
        setErrores({ correo: '* Este correo ya está en uso' });
      } else {
        setErrores({ general: '* Error al crear la cuenta, intenta de nuevo' });
      }
    }
  };

  if (exito) return (
    <div className="areaDelRegistro tarjetaLogReg">
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <i className="material-icons" style={{ fontSize: '3rem', color: 'var(--primary)' }}>check_circle</i>
        <h2 style={{ marginTop: '16px' }}>¡Cuenta creada!</h2>
        <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Redirigiendo al login...</p>
      </div>
    </div>
  );

  return (
    <div className="areaDelRegistro tarjetaLogReg">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Registrarse</h2>

        {/* Nombre */}
        <div>
          <div className="input-logReg">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); setErrores({}); }}
              autoComplete="off"
            />
            <i className="material-icons">person</i>
          </div>
          {errores.nombre && <p className="errorTextCuenta" style={{ display: 'block' }}>{errores.nombre}</p>}
        </div>

        {/* Correo */}
        <div>
          <div className="input-logReg">
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => { setCorreo(e.target.value); setErrores({}); }}
              autoComplete="off"
            />
            <i className="material-icons">mail</i>
          </div>
          {errores.correo && <p className="errorTextCuenta" style={{ display: 'block' }}>{errores.correo}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <div className="input-logReg">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrores({}); }}
              autoComplete="off"
            />
            <i className="material-icons">lock</i>
          </div>
          {errores.password && <p className="errorTextCuenta" style={{ display: 'block' }}>{errores.password}</p>}
        </div>

        {errores.general && <p className="errorTextCuenta" style={{ display: 'block' }}>{errores.general}</p>}

        {/* Botones */}
        <div className="wrapper-button">
          <button className="log-button muted-button" type="button" onClick={onCerrar}>
            Cancelar
          </button>
          <button
            className="log-button blanco-button"
            type="button"
            id="crearCuentaBoton"
            onClick={handleRegistro}
            disabled={cargando}
          >
            {cargando ? 'Creando...' : 'Comenzar'}
          </button>
        </div>

        <button className="log-button-a" type="button" onClick={onIrLogin}>
          ¿Ya tienes una cuenta?
        </button>
      </form>
    </div>
  );
}

export default LoginDialog;