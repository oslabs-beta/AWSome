import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: true, // Enable polyfilling for `global`
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/data': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/signup': 'http://localhost:3000',
      '/protected': 'http://localhost:3000',
    },
  },
  preview: {
    allowedHosts: true
  },
});
