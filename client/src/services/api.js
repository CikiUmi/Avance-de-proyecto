// client/src/services/api.js
// Todas las llamadas al backend en un solo lugar

const BASE = '/api'; // El proxy de Vite redirige esto a tu backend

// ─── Helper: token guardado ───────────────────
const getToken = () => localStorage.getItem('token');

// ─── Helper: headers con autenticación ────────
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
});

// ─── AUTH ──────────────────────────────────────

export const login = async (correo, password) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // guardar datos del usuario
  }
  return { ok: res.ok, data };
};

export const register = async (nombre, correo, password) => {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, password })
  });
  return { ok: res.ok, data: await res.json() };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUsuarioLocal = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ─── CATÁLOGO ──────────────────────────────────

export const getCatalogo = async () => {
  const res = await fetch(`${BASE}/catalogo`, {
    headers: authHeaders()
  });
  return res.json();
};

export const getProducto = async (id) => {
  const res = await fetch(`${BASE}/catalogo/${id}`, {
    headers: authHeaders()
  });
  return res.json();
};

// ─── CARRITO ───────────────────────────────────

export const getCarrito = async (userID) => {
  const res = await fetch(`${BASE}/carrito/${userID}`, {
    headers: authHeaders()
  });
  return res.json();
};

export const addAlCarrito = async (userID, item) => {
  const res = await fetch(`${BASE}/carrito/${userID}/add`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(item)
  });
  return res.json();
};

export const vaciarCarrito = async (userID) => {
  const res = await fetch(`${BASE}/carrito/${userID}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return res.json();
};

// ─── PEDIDOS ───────────────────────────────────

export const crearPedido = async (userID, metodoPago) => {
  const res = await fetch(`${BASE}/pedido/${userID}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ metodoPago })
  });
  return res.json();
};

export const getPedidos = async () => {
  const res = await fetch(`${BASE}/pedido`, {
    headers: authHeaders()
  });
  return res.json();
};

// ─── CUENTA DE USUARIO ─────────────────────────

export const getCuenta = async (id) => {
  const res = await fetch(`${BASE}/cuentaUsuario/${id}`, {
    headers: authHeaders()
  });
  return res.json();
};

export const updateCuenta = async (id, datos) => {
  const res = await fetch(`${BASE}/cuentaUsuario/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(datos)
  });
  return res.json();
};