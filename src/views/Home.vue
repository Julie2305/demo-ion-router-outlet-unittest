<template>
    <ion-page>
        <ion-content>
            <h1>
                Home 
            </h1>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonPage,
    onIonViewDidEnter,
} from '@ionic/vue';

onIonViewDidEnter(() => {
    console.log('This needs to be triggered in the test')
});
</script>

<style>
</style>
