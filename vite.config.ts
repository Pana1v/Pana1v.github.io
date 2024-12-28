import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pana1v.github.io/', // Replace 'your-repo-name' with your GitHub repository name
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude 'lucide-react' if necessary
  },
});
