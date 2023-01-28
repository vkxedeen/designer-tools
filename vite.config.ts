import { defineConfig,  } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    port: 3010
  },
  plugins: [
    react(),
    tsconfigPaths(),
    eslint(),
  ],
})
