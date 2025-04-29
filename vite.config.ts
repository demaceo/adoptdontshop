import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  base: "/adoptdontshop",
  plugins: [react(), viteCompression()],
  build: {
    minify: "terser",
  },
  server: {
    port: 5173, // Change to any unused port

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
