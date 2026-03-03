// PiePagina.jsx
import { Link } from 'react-router-dom';
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
            <li><Link to="#">Preguntas Frecuentes</Link></li>
            <li><Link to="#">Sustentabilidad</Link></li>
            <li><Link to="#">Aviso de Privacidad</Link></li>
            <li><Link to="#">Atención a Clientes</Link></li>
          </ul>
        </div>

        <div className="columnaPiePagina">
          <h2>Categorías</h2>
          <div className="categoriasTexto">
            <Link to="#">Camisas</Link>
            <Link to="#">Playeras</Link>
            <Link to="#">Sudaderas</Link>
            <Link to="#">Calzado</Link>
            <Link to="#">Accesorios</Link>
            <Link to="#">Pantalones</Link>
            <Link to="#">Faldas</Link>
            <Link to="#">Vestidos</Link>
            <Link to="#">Chamarras</Link>
            <Link to="#">Otros</Link>
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
          <Link to="#">
            <i className="fa-brands fa-instagram footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-tiktok footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-facebook footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-threads footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-reddit footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-bilibili footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-pinterest footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-tumblr footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-node footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-github footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-linkedin footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-steam footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-twitch footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-x-twitter footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-vk footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-whatsapp footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-blogger footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-battle-net footerIcons"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-wikipedia-w footerIcons"></i>
          </Link>


        </div>
        <div>
          <p id="copyright">Sir Lucxs Studio © 2026</p>
        </div>
      </div>
    </footer >
  );
}

export default PiePagina;