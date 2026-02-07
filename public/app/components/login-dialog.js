

/* VISIBILIDAD DE LA VENTANIDA POP-UP EN LAS PÁGINAS */
const dialog = document.getElementById("login-dialog");
const wrapper = document.querySelector(".areaDelLogin");

const visibilidadDialog = (show) => show ? dialog.showModal() : dialog.close();

/* Si se detecta un click afuera, se cierra el pop-up */
dialog.addEventListener("click", (e) => {
  (!wrapper.contains(e.target)) && dialog.close();
})