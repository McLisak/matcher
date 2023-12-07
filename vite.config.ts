import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://mclisak.github.io/matcher/',
  server: {
    port: 8080,
  },
  build: {
    outDir: 'docs',

  },
  plugins: [react()],
});
