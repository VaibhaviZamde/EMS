import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws', // Use WebSockets for HMR
      host: 'localhost', // Ensure the correct host for WebSocket connections
    },
  },
});
