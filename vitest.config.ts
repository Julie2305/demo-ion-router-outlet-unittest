import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['/tests/unit/vite.setup.ts'],
        coverage: {
            reporter: ['text', 'lcov'],
            include: ['src/**/*.{ts,tsx,js,jsx,vue}'],
            exclude: ['src/**/interfaces/**/*.ts', 'src/**/*.d.ts', 'src/**/enums/**/*.ts'],
            all: true,
        },
        deps: {
            inline: ['@ionic/core'],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@ionic/vue': fileURLToPath(new URL('./node_modules/@ionic/vue/dist/index', import.meta.url)),
            '@ionic/vue-router': fileURLToPath(new URL('./node_modules/@ionic/vue-router/dist/index', import.meta.url)),
        },
    },
});
