/* Llamadas al backend */
const dotenv = require('dotenv');

// client/src/services/api.js
// Todas las llamadas al backend en un solo lugar

module.exports = app;
if (process.env.NODE_ENV !== 'development') {
const BASE = '/api';
}else{
  const BASE = 'http://localhost:3001/api';
}

// Helper para obtener el token guardado
const getToken = () => localStorage.getItem('token');

// Headers con autenticación
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
});

// ─── AUTH ────────────────────────────────────
export const login = async (correo, password) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  });
  const data = await res.json();
  if (res.ok) localStorage.setItem('token', data.token);
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

// ─── CATÁLOGO ─────────────────────────────────
export const getCatalogo = async () => {
  const res = await fetch(`${BASE}/catalogo`, {
    headers: authHeaders()
  });
  return res.json();
};

// ─── CARRITO ──────────────────────────────────
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