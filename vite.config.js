import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

console.log('Vite configuration loaded');
export default defineConfig({
  plugins: [react() ],
})

