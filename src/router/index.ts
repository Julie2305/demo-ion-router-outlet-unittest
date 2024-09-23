
import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '@/views/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
    ],
});

export default router;
