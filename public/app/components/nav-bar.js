class navigationBar extends HTMLElement {
  constructor() {
    super(); /* Jala constructoe de HTMLElement */

  }

  connectedCallback() {
    this.innerHTML = `
<!-- Fuentes e íconos -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap"
    rel="stylesheet">

  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- Hoja(s) de estilos :DD -->
  <link rel="stylesheet" href="../styles/styles.css">
  <link rel="stylesheet" href="../styles/IDstyling.css">


  <div id="navbarDiv">
    <header class="navbar">
      <h1 class="logo">Sir LucXs StudiO</h1>

      <nav>
        <a href="catalogo.html">Catálogo</a>

        <a href= "#">
          <i class="material-icons"  id="iconoCarrito">shopping_cart</i>
          <span class="badge">4</span>
        </a>

        <a href= "#">
          <i class="material-icons">person</i>
        </a>

      </nav>
    </header>
  </div>

</div>
   `;
  }
}
customElements.define('nav-bar', navigationBar);