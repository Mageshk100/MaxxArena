import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Optimize Monaco Editor for local loading
  optimizeDeps: {
    include: ['monaco-editor'],
  },
});
