import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Note: change base to '/workshop_booking/' when deploying to GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/workshop_booking/',
})
