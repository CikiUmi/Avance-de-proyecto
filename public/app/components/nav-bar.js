class navigationBar extends HTMLElement {
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


  <div id="navbarDiv">
    <header class="navbar">
      <h1 class="logo">Sir LucXs StudiO</h1>

      <nav>
      <a href="catalogo.html" class = "navBarTitles">Pedidos</a>
      <a href="#" class = "navBarTitles">Sobre nosotros</a>
      <a href="#" class = "navBarTitles">Catálogo</a>

        <a href= "#">
          <i class="material-icons"  id="iconoCarrito">shopping_cart</i>
          <span class="badge">4</span>
        </a>

        <a href= "#">
          <i class="material-icons" id="iconoUser">person</i>
        </a>

      </nav>
    </header>
  </div>

</div>
   `;
  }
}
customElements.define('nav-bar', navigationBar);