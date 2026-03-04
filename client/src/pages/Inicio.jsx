// client/src/pages/Inicio.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import LoginDialog from '../components/LoginDialog';

// Imágenes del carrusel — usa tus propias imágenes en /public/resources/
// o urls externas si no tienes las locales todavía
const SLIDES = [
  {
    img: '/resources/slide1.jpg',
    titulo: 'Sir LucXs StudiO',
    subtitulo: 'Viste con estilo, viste Sir Lucas',
  },
  {
    img: '/resources/slide2.jpg',
    titulo: 'Colección Verano 2026',
    subtitulo: 'Fresco, cómodo y vibrante',
  },
  {
    img: '/resources/slide3.jpg',
    titulo: 'Nueva tecnología de manufactura',
    subtitulo: 'Calidad, comodidad y sustentabilidad',
  },
];

function Inicio() {
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const navigate = useNavigate();

  if (localStorage.getItem('token')) {
    navigate('/catalogo');
    return null;
  }

  return (
    <>
      <Navbar onAbrirLogin={() => setDialogAbierto(true)} />

      {/* ── Carrusel hero ── */}
      <section className="hero-carousel">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          transitionTime={700}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className="slide-wrapper">
              <img src={slide.img} alt={slide.titulo} className="slide-img" />
              <div className="slide-overlay">
                <h1 className="slide-titulo logo">{slide.titulo}</h1>
                <p className="slide-subtitulo">{slide.subtitulo}</p>
                <div className="slide-botones">
                  <button
                    className="log-button blanco-button"
                    onClick={() => setDialogAbierto(true)}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    className="log-button"
                    style={{ border: '1px solid var(--blanco)' }}
                    onClick={() => setDialogAbierto(true)}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* ── Sección info ── */}
      <section className="inicio-info">
        <div className="inicio-info-bloque">
          <h2>Conoce nuestra nueva tecnología de manufactura</h2>
          <p>
            Sir Lucas Studio está siempre a la vanguardia y por eso nos emociona presentar
            nuestra nueva tecnología de manufactura de ropa. Diseñada para ofrecerte prendas
            de alta calidad, cómodas y sostenibles.
          </p>
          <button
            className="log-button blanco-button"
            style={{ marginTop: '20px', width: 'auto', padding: '10px 28px' }}
            onClick={() => setDialogAbierto(true)}
          >
            Explorar catálogo
          </button>
        </div>

        <div className="inicio-info-bloque inicio-coleccion">
          <h2>Colección Verano 2026</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '12px' }}>
            El calor está llegando y nosotros estamos listos. Inspirada en los colores
            vibrantes de la naturaleza, esta colección es perfecta para quienes buscan
            algo fresco y cómodo.
          </p>
        </div>
      </section>

      {/* ── Mapa sucursal ── */}
      <section className="inicio-sucursal">
        <div className="sucursal-mapa">
          <iframe
            title="Sucursal Sir Lucas Studio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.4!2d-99.601!3d19.291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE3JzI3LjYiTiA5OcKwMzYnMDMuNiJX!5e0!3m2!1ses!2smx!4v1"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: 'var(--radius-big)' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="sucursal-info">
          <h2>Sucursal física</h2>
          <p>
            Calle Guadalupe Victoria 221, Las Jaras, San Jorge Pueblo Nuevo, Méx., México.
          </p>
          <p style={{ marginTop: '12px', color: 'var(--muted)', fontSize: '0.95rem' }}>
            Todos los pedidos se recogen en mostrador. No contamos con servicio de paquetería.
          </p>
          <p style={{ marginTop: '8px', color: 'var(--muted)', fontSize: '0.95rem' }}>
            También contamos con venta por mayoreo y menudeo.
          </p>
        </div>
      </section>

      <LoginDialog
        abierto={dialogAbierto}
        onCerrar={() => setDialogAbierto(false)}
      />

      <PiePagina />
    </>
  );
}

export default Inicio;
