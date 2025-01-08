import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change to any unused port

    // proxy: {
    //   '/v2': {
    //     target: 'https://api.petfinder.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/v2/, ''),
    //   },
    // },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
    },
  },
});
