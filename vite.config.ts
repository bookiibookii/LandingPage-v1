import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://bookiibookii.gyeonseo.com',
        changeOrigin: true,
        secure: false,
      },
      '/s3-image': {
        target: 'https://booki-dev-s3.s3.ap-northeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/s3-image/, ''),
      },
    },
  },
})
