// login.js - lógica básica de autenticación
(function () {
  const form = document.getElementById('loginForm');
  const errorEl = document.getElementById('error');

  // Cambia si tu backend usa otra ruta base
  const API_BASE = '/api';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        errorEl.textContent = data.message || 'Error en autenticación';
        return;
      }

      // Se asume respuesta con token: { token, user }
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Guardar user id si existe para llamadas que lo necesiten
        if (data.user && (data.user.id || data.user._id)) localStorage.setItem('userId', data.user.id || data.user._id);
        window.location.href = '/pages/main.html';
      } else {
        errorEl.textContent = 'No se recibió token del servidor.';
      }
    } catch (err) {
      console.error(err);
      errorEl.textContent = 'Error de red. Revisa el servidor.';
    }
  });
})();
