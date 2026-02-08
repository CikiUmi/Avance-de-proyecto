
/* === LOGIN */
/* VISIBILIDAD DE LA VENTANIDA POP-UP EN LAS PÁGINAS */
const dialogLogin = document.getElementById("login-dialog");
const wrapper = document.querySelector(".areaDelLogin");

const visibilidadDialog = (show) => show ? dialogLogin.showModal() : dialogLogin.close();

/* Si se detecta un click afuera, se cierra el pop-up */
dialogLogin.addEventListener("click", (e) => {
  (!wrapper.contains(e.target)) && dialogLogin.close();
})

/* === REGISTRO */
/* VISIBILIDAD COSA PARA REGISTRAR (CREAR CUENTA) */
const dialogRegistro = document.getElementById("register-dialog");
const wrapperRegister = document.querySelector(".areaDelRegistro");

const visibilidadRegistro = (show) => show ? dialogRegistro.showModal() : dialogRegistro.close();

dialogRegistro.addEventListener("click", (e) => {
  (!wrapperRegister.contains(e.target)) && dialogRegistro.close();
})

/* === LOGIN */
/* INTERCAMBIO DE ELEMENTOS */
const intercambioElementos = () => {
  if (dialogLogin.open){
    visibilidadDialog(false);
    visibilidadRegistro(true);
  }else{
        visibilidadDialog(true);
    visibilidadRegistro(false);
  }
}