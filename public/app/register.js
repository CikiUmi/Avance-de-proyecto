/* == VARIABLES :DD */
/* BOTÓN */
const crearCuentaBoton = document.getElementById("crearCuentaBoton");

/* INPUTS */
const registroUserInput = document.getElementById("registroUserInput");
const registroCorreoInput = document.getElementById("registroCorreoInput");
const registroContrasenaInput = document.getElementById("registroContrasenaInput");

/* ERRORES */
const registroUsuarioError = document.getElementById("registroUsuarioError");

const registroCorreoError = document.getElementById("registroCorreoError");
const registroCorreoErrorRepetido = document.getElementById("registroCorreoErrorRepetido");

const registroContrasenaError = document.getElementById("registroContrasenaError");
const registroContrasenaErrorMayuscula = document.getElementById("registroContrasenaErrorMayuscula");
const registroContrasenaErrorMinuscula = document.getElementById("registroContrasenaErrorMinuscula");
const registroContrasenaErrorNumero = document.getElementById("registroContrasenaErrorNumero");
const registroContrasenaErrorSimbolo = document.getElementById("registroContrasenaErrorSimbolo");

/* == FUNCIÓN */
const intentarRegistroUsuario = () => {
  const nombre = (registroUserInput.value).trim()
  const correo = (registroCorreoInput.value).trim()
  const password = (registroContrasenaInput.value).trim()

  if (nombre === "") {
    registroUsuarioError.style.display = "block";
  } else {
    registroUsuarioError.style.display = "none";
  }

  if (correo === "") {
    registroCorreoError.style.display = "block";
  }
  else {
    registroCorreoError.style.display = "none";
  }

  if (password === "") {
    registroContrasenaError.style.display = "block";
  } else {
    registroContrasenaError.style.display = "none";
  }

  if (!(nombre === "") && !(correo === "") && !(password === "")) {
    //revisar regex de contraseña
    //revisar correo único
    //lamar pi
    fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password })
    })
    //ocultar

  }
};

const ocultarError = (errorTexto) => {
errorTexto.style.display = "none";
}

crearCuentaBoton.addEventListener("click", intentarRegistroUsuario);
registroUserInput.addEventListener("input", registroUsuarioError.style.display = "none");

// Event listener para borrar error si se meten datos.
// DEVOLVER 200, 400, 401, 500 etc