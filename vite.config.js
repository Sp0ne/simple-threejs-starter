import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/static-deploy.html#github-pages
export default defineConfig({
  base: '/simple-threejs-starter/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9000,
  },
  plugins: [glsl()],
})
