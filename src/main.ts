import {createApp} from 'vue'
import "@/assets/styles/style.scss";
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {createPinia} from "pinia";
import router from "@/router/router";
import i18n from "@/localization";

//// PRIME ICONS
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: {
                // name: 'primevue',
                // order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    },

})
    .use(createPinia())
    .use(router)
    .use(i18n)
    .mount('#app')


