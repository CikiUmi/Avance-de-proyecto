import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cambia esta URL por la de tu backend en Render una vez que lo despliegues
// Ejemplo: 'https://sir-lucxs-backend.onrender.com'
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:3000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
      }
    }
  }
})
