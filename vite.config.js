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
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      //can be deleted
      // '/login': 'http://localhost:3000',
      // '/signup': 'http://localhost:3000',
      // '/protected': 'http://localhost:3000',
      '/random': 'http://localhost:81',
      '/data': 'http://localhost:81',
    },
    historyApiFallback: true, //ensures client-side routing works
  },

  // preview: {
  //   allowedHosts: true,
  // },
});
