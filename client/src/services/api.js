// client/src/services/api.js
const BASE = '/api';

const getToken = () => localStorage.getItem('token');

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
    localStorage.setItem('user', JSON.stringify(data.user));
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
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch { return null; }
};

export const esAdmin = () => {
  const u = getUsuarioLocal();
  return u?.rol === 'admin';
};

// ─── CATÁLOGO ──────────────────────────────────

export const getCatalogo = async (page = 1, pageSize = 20) => {
  const res = await fetch(`${BASE}/catalogo?page=${page}&pageSize=${pageSize}`, {
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

export const createProducto = async (datos) => {
  const res = await fetch(`${BASE}/catalogo`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(datos)
  });
  return { ok: res.ok, data: await res.json() };
};

export const updateProducto = async (id, datos) => {
  const res = await fetch(`${BASE}/catalogo/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(datos)
  });
  return { ok: res.ok, data: await res.json() };
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${BASE}/catalogo/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return { ok: res.ok, data: await res.json() };
};

// ─── CARRITO ───────────────────────────────────

export const getCarrito = async (userID) => {
  const res = await fetch(`${BASE}/carrito/${userID}`, {
    headers: authHeaders()
  });
  if (res.status === 404) return null;
  return res.json();
};

export const crearCarrito = async (usuario) => {
  const res = await fetch(`${BASE}/carrito`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ usuario })
  });
  return { ok: res.ok, data: await res.json() };
};

export const addAlCarrito = async (userID, item) => {
  const res = await fetch(`${BASE}/carrito/${userID}/add`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(item)
  });
  return { ok: res.ok, data: await res.json() };
};

export const updateCarrito = async (userID, productos) => {
  const res = await fetch(`${BASE}/carrito/${userID}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ productos })
  });
  return { ok: res.ok, data: await res.json() };
};

export const vaciarCarrito = async (userID) => {
  const res = await fetch(`${BASE}/carrito/${userID}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return { ok: res.ok, data: await res.json() };
};

// ─── PEDIDOS ───────────────────────────────────

export const crearPedido = async (userID, metodoPago) => {
  const res = await fetch(`${BASE}/pedido/${userID}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ metodoPago })
  });
  return { ok: res.ok, data: await res.json() };
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
  return { ok: res.ok, data: await res.json() };
};

// ─── CLIMA ─────────────────────────────────────

export const getRecomendacionClima = async (ciudad) => {
  const res = await fetch(`${BASE}/clima/recomendacion?ciudad=${encodeURIComponent(ciudad)}`, {
    headers: authHeaders()
  });
  return res.json();
};
