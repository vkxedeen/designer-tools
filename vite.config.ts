import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://84.252.138.33:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: proxy => {
          proxy.on('proxyReq', (proxyReq, msg) => {
            console.log(proxyReq);
          });
        }
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    eslint(),
  ],
});
