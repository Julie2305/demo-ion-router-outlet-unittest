import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'nl.netive.vms.app',
    appName: 'netive-vms',
    webDir: 'dist',
    bundledWebRuntime: false,
    server: {
        cleartext: true,
    },
    plugins: {
        SplashScreen: {
            launchAutoHide: false,
            backgroundColor: '#4A7B77',
        },
    },
};

export default config;
