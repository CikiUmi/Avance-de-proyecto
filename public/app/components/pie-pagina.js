class pieDePagina extends HTMLElement {
  constructor() {
    super(); /* Jala constructoe de HTMLElement */

  }

  connectedCallback() {
    this.innerHTML = `

  <!-- Fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap"
    rel="stylesheet">

  <!-- Íconos -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script src="https://kit.fontawesome.com/028972a11e.js" crossorigin="anonymous"></script>

  <!-- Hoja(s) de estilos :DD -->
  <link rel="stylesheet" href="../styles/styles.css">
  <link rel="stylesheet" href="../styles/IDstyling.css">

  <!-- Script -->
  <script src="../app/components/nav-bar.js" type="text/javascript" defer></script>
  <script src="../app/components/login-dialog.js" type="text/javascript" defer></script>
  <script src="../app/components/pie-pagina.js" type="text/javascript" defer></script>

  <!-- Información de la página -->
  <link rel="icon" href="../resources/SirLucxsStudio-Logo.ico">
  
  <!-- Pie de página -->
  <footer>
    <div class="piePagina">
      <div class="columnaPiePagina" id="primerColumnaFooter">
        <h2 class="logo">Sir Lucxs StudiO</h2>
        <p class="slogan">Proyecto para Desarrollo Fullstack</p>
      </div>

      <div class="columnaPiePagina">
        <h2>Recursos</h2>

        <ul class="listaRecursos">
          <li><a href="#">Preguntas Frecuentes</a></li>
          <li><a href="#">Sustentabilidad</a></li>
          <li><a href="#">Aviso de Privacidad</a></li>
          <li><a href="#">Atención a Clientes</a></li>
        </ul>
      </div>

      <div class="columnaPiePagina">
        <h2>Categorías</h2>
        <div>
          <a href="#">Camisas</a>
          <a href="#">Playeras</a>
          <a href="#">Sudaderas</a>
          <a href="#">Calzado</a>
          <a href="#">Accesorios</a>
          <a href="#">Pantalones</a>
          <a href="#">Faldas</a>
          <a href="#">Vestidos</a>
          <a href="#">Chamarras</a>
          <a href="#">Otros</a>
        </div>
      </div>

      <div class="columnaPiePagina" id="ultimaColumnaFooter">
        <h2>Contacto</h2>
        <div class="newsletterPie">
          <input class="input-correo" type="email" placeholder="Correo">
          <button class="button-contacto" type="submit">Enviar</button>
        </div>
        <p>¡Suscríbete para recibir nuestras actualizaciones!</p>

      </div>
    </div>


    <div class="footerFilas">
      <div class="filaRedesSociales">
        <a href="#">
          <i class="fa-brands fa-instagram footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-tiktok footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-facebook footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-threads footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-reddit footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-bilibili footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-pinterest footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-tumblr footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-node footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-github footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-linkedin footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-steam footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-twitch footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-x-twitter footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-vk footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-whatsapp footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-blogger footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-battle-net footerIcons"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-wikipedia-w footerIcons"></i>
        </a>


      </div>
      <div>
        <p id="copyright">Sir Lucxs Studio © 2026</p>
      </div>
    </div>
  </footer>
  `;
  }
}
customElements.define('pie-pagina', pieDePagina);