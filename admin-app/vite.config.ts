import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Admin do site (/admin). O build vai para ../admin — pasta estática servida pelo site
 * (Vercel e server.js), sem build no deploy: rode `npm run admin:build` e commite admin/.
 *
 * Em dev (`npm run admin:dev`), /api e /assets vão para o devserver do site (porta 4321),
 * que executa as funções de api/ e serve o logo de assets/brand.
 */
const SITE_DEV = process.env.SITE_DEV_URL || 'http://localhost:4321';

export default defineConfig({
  base: '/admin/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../admin',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    proxy: {
      '/api': SITE_DEV,
      '/assets': SITE_DEV,
    },
  },
});
