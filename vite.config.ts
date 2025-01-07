// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
// import swc from 'vite-plugin-swc';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // plugins: [swc()],
  plugins: [react()],
  server: {
    port: 3001, // Change to any unused port
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
