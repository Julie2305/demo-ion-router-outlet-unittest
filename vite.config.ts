import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import { wolfWatcher } from '@wolf/components/wolf-watcher';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslint({ lintOnStart: true }),
        wolfWatcher(),
    ],
    server: {
        port: 3000,
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
