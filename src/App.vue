<template>
    <ion-app>
        <ion-router-outlet />
    </ion-app>
</template>

<script lang="ts" setup>
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
    IonApp, IonRouterOutlet, useBackButton, useIonRouter, 
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/global';

useGlobalStore().initGlobalStore();
const route = useRoute();
const router = useIonRouter();

if (Capacitor.getPlatform() === 'android') StatusBar.setBackgroundColor({ color: '#4A7B77' });
StatusBar.setStyle({ style: Style.Dark });
SplashScreen.hide();

useBackButton(1, () => {
    // Handle back button on Android - User shouldnt be able to go back to login screen when on Home. 
    if (route.name === 'Home') return;
    
    if (router.canGoBack()) router.back();
});

</script>
