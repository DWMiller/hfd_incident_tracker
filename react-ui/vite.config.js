import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3002',
      '/socket.io': {
        target: 'http://localhost:3002',
        ws: true,
      },
    },
  },
  build: {
    outDir: 'build',
  },
});
