import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://onhouse.netlify.app",
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
  },
  server: {
    proxy: {
      '/api': 'https://ibond.abdelrahman-saad.cc',
    },
  },

})
