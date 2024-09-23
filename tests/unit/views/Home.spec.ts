import {
    IonApp, IonicVue, IonRouterOutlet, 
} from '@ionic/vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { mount } from '@vue/test-utils';
import {
    describe, it, expect,
} from 'vitest';
import Home from '@/views/Home.vue';

const AppWithIonRouterOutlet = {
    components: { IonApp, IonRouterOutlet },
    template: '<ion-app><ion-router-outlet /></ion-app>',
};
        
const router = createRouter({
    history: createWebHistory('base_url'),
    routes: [
        { path: '/', name: 'component-route', component: Home },
    ],
});

describe('Home', () => {
    it('renders 1', async () => {
        const wrapper = mount(AppWithIonRouterOutlet, {
            global: {
                plugins: [IonicVue, router],
            },
        });

        router.push({ name: 'component-route' });
        await router.isReady();

        console.log(wrapper.html());

        expect(wrapper.exists()).toBe(true);

        wrapper.unmount();
    });

    it('renders 2', async () => {
        const wrapper = mount(AppWithIonRouterOutlet, {
            global: {
                plugins: [IonicVue, router],
            },
        });
    
        router.push({ name: 'component-route' });
        await router.isReady();
        console.log(wrapper.html());
        expect(wrapper.exists()).toBe(true);
    
        wrapper.unmount();
    });
});
