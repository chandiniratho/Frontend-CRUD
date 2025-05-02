import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Frontend-CRUD/', // Required for GitHub Pages
  plugins: [react()],
  server: {
    proxy: {
      '/items': 'https://68146c89225ff1af1628c822.mockapi.io', // Proxy to MockAPI
    },
  },
})
