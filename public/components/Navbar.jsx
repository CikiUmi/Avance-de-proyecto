// Navbar.jsx
function Navbar() {
  return (

  <div id="navbarDiv">
    <header className="navbar">
    <a href= "#" id="logoNavBar">
      <h1 className="logo">Sir LucXs StudiO</h1>
    </a>

      <nav>
      <a href="catalogo.html" className = "navBarTitles">Pedidos</a>
      <a href="#" className = "navBarTitles">Sobre nosotros</a>
      <a href="#" className = "navBarTitles">Catálogo</a>

        <a href= "#">
          <i className="material-icons"  id="iconoCarrito">shopping_cart</i>
          <span className="badge">X</span>
        </a>

        <a href= "#">
          <i className="material-icons" id="iconoUser">person</i>
        </a>

      </nav>
    </header>
  </div>
);
}

export default Navbar;
