// Navbar.jsx
function Navbar() {
  return (

  <div id="navbarDiv">
    <header class="navbar">
    <a href= "#" id="logoNavBar">
      <h1 class="logo">Sir LucXs StudiO</h1>
    </a>

      <nav>
      <a href="catalogo.html" class = "navBarTitles">Pedidos</a>
      <a href="#" class = "navBarTitles">Sobre nosotros</a>
      <a href="#" class = "navBarTitles">Catálogo</a>

        <a href= "#">
          <i class="material-icons"  id="iconoCarrito">shopping_cart</i>
          <span class="badge">X</span>
        </a>

        <a href= "#">
          <i class="material-icons" id="iconoUser">person</i>
        </a>

      </nav>
    </header>
  </div>
);
}

export default Navbar;