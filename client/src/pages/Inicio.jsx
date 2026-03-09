// client/src/pages/Inicio.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PiePagina from '../components/PiePagina';
import LoginDialog from '../components/LoginDialog';

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

// ── Carrusel propio (sin dependencias externas) ──
function Carrusel({ onAbrirLogin }) {
  const [actual, setActual] = useState(0);
  const timer = useRef(null);

  const siguiente = () => setActual(a => (a + 1) % SLIDES.length);
  const anterior  = () => setActual(a => (a - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timer.current = setInterval(siguiente, 5000);
    return () => clearInterval(timer.current);
  }, []);

  const reiniciar = () => {
    clearInterval(timer.current);
    timer.current = setInterval(siguiente, 5000);
  };

  const irA = (i) => { setActual(i); reiniciar(); };

  return (
    <section className="hero-carousel">
      <div className="slide-wrapper">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="slide-item"
            style={{ opacity: i === actual ? 1 : 0, transition: 'opacity 0.8s ease' }}
          >
            <img src={slide.img} alt={slide.titulo} className="slide-img" />
          </div>
        ))}

        {/* Overlay con texto encima */}
        <div className="slide-overlay">
          <h1 className="slide-titulo logo">{SLIDES[actual].titulo}</h1>
          <p className="slide-subtitulo">{SLIDES[actual].subtitulo}</p>
          <div className="slide-botones">
            <button className="log-button blanco-button" onClick={onAbrirLogin}>
              Iniciar sesión
            </button>
            <button
              className="log-button"
              style={{ border: '1px solid var(--blanco)' }}
              onClick={onAbrirLogin}
            >
              Registrarse
            </button>
          </div>
        </div>

        {/* Flechas */}
        <button className="slide-arrow slide-arrow-left" onClick={() => { anterior(); reiniciar(); }}>
          ‹
        </button>
        <button className="slide-arrow slide-arrow-right" onClick={() => { siguiente(); reiniciar(); }}>
          ›
        </button>

        {/* Dots */}
        <div className="slide-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`slide-dot ${i === actual ? 'activo' : ''}`}
              onClick={() => irA(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Inicio() {
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/catalogo');
    }
  }, []);

  return (
    <>
      <Navbar onAbrirLogin={() => setDialogAbierto(true)} />

      <Carrusel onAbrirLogin={() => setDialogAbierto(true)} />

      {/* ── Sección info ── */}
      <section className="inicio-info">
        <div className="inicio-info-bloque">
          <h2>Conoce nuestra nueva tecnología de manufactura</h2>
          <p>
            Sir Lucas Studio está siempre a la vanguardia. Nuestra nueva tecnología
            de manufactura ofrece prendas de alta calidad, cómodas y sostenibles.
          </p>
          <button
            className="log-button blanco-button"
            style={{ marginTop: '20px', width: 'auto', padding: '10px 28px' }}
            onClick={() => setDialogAbierto(true)}
          >
            Explorar catálogo
          </button>
        </div>

        <div className="inicio-info-bloque">
          <h2>Colección Verano 2026</h2>
          <p style={{ color: 'var(--muted)' }}>
            El calor está llegando y nosotros estamos listos. Inspirada en los colores
            vibrantes de la naturaleza, esta colección es perfecta para quienes buscan
            algo fresco y cómodo.
          </p>
        </div>
      </section>

      {/* ── Sucursal ── */}
      <section className="inicio-sucursal">
        <div className="sucursal-mapa">
          <iframe
            title="Sucursal Sir Lucas Studio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.0!2d-99.601!3d19.291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTk!5e0!3m2!1ses!2smx!4v1"
            width="100%" height="300"
            style={{ border: 0, borderRadius: 'var(--radius-big)' }}
            allowFullScreen loading="lazy"
          />
        </div>
        <div className="sucursal-info">
          <h2>Sucursal física</h2>
          <p>Calle Guadalupe Victoria 221, Las Jaras, San Jorge Pueblo Nuevo, Méx., México.</p>
          <p style={{ marginTop: '12px', color: 'var(--muted)', fontSize: '0.95rem' }}>
            Todos los pedidos se recogen en mostrador. No contamos con servicio de paquetería.
          </p>
        </div>
      </section>

      <LoginDialog abierto={dialogAbierto} onCerrar={() => setDialogAbierto(false)} />
      <PiePagina />
    </>
  );
}

export default Inicio;
