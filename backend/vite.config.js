import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../backend/public',
        emptyOutDir: true,
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
                '/api': 'http://localhost:8000',
                '/sanctum': 'http://localhost:8000',
            },
        },
    },
});
