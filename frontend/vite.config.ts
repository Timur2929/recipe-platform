import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api':{ target:'http://localhost:8001',     // Проксируем API-запросы на Laravel
            changeOrigin:true,
            secure: false
        },
      }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
});