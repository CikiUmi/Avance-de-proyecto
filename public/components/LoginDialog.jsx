import { useState } from "react";
import api from "../services/api";

function LoginDialog() {
  const [abierto, setAbierto] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const intentarLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/usuarios/login", {
        correo,
        contrasena,
      });

      // Guardar token
      localStorage.setItem("token", response.data.token);

      setAbierto(false);
      alert("Login exitoso");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <>
      <button onClick={() => setAbierto(true)}>LOG IN</button>

      {abierto && (
        <dialog open className="login-dialog">
          <form onSubmit={intentarLogin}>
            <h2>Iniciar sesión</h2>

            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Entrar</button>
            <button type="button" onClick={() => setAbierto(false)}>
              Cancelar
            </button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default LoginDialog;