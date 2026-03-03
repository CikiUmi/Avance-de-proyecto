// PiePagina.jsx
function PiePagina() {
  return (
    <footer>
      <div className="piePagina">
        <div className="columnaPiePagina" id="primerColumnaFooter">
          <h2 className="logo">Sir Lucxs StudiO</h2>
          <p className="slogan">Proyecto para Desarrollo Fullstack</p>
        </div>

        <div className="columnaPiePagina">
          <h2>Recursos</h2>

          <ul className="listaRecursos">
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Sustentabilidad</a></li>
            <li><a href="#">Aviso de Privacidad</a></li>
            <li><a href="#">Atención a Clientes</a></li>
          </ul>
        </div>

        <div className="columnaPiePagina">
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

        <div className="columnaPiePagina" id="ultimaColumnaFooter">
          <h2>Contacto</h2>
          <div className="newsletterPie">
            <input className="input-correo" type="email" placeholder="Correo" />
            <button className="button-contacto" type="submit">Enviar</button>
          </div>
          <p>¡Suscríbete para recibir nuestras actualizaciones!</p>

        </div>
      </div >

      <div className="footerFilas">
        <div className="filaRedesSociales">
          <a href="#">
            <i className="fa-brands fa-instagram footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-tiktok footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-facebook footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-threads footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-reddit footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-bilibili footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-pinterest footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-tumblr footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-node footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-github footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-steam footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitch footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-x-twitter footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-vk footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-whatsapp footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-blogger footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-battle-net footerIcons"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-wikipedia-w footerIcons"></i>
          </a>


        </div>
        <div>
          <p id="copyright">Sir Lucxs Studio © 2026</p>
        </div>
      </div>
    </footer >
  );
}

export default PiePagina;