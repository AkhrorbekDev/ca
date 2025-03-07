import {createApp} from 'vue'
import "@/assets/styles/style.scss";
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {createPinia} from "pinia";
import router from "@/router/router";
import i18n from "@/localization";
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import auth from "@/modules/auth";
import api from '@/plugins/api'
import {vMaska} from "maska"
//// PRIME ICONS
import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(createPinia())
app.directive('maska', vMaska)
app.use(auth, {
    appId: '#app',
    baseUrl: 'https://api.carting.uz/api',
    endpoints: {
        login: {
            url: '/mobile/v1/phone/verify',
            method: 'post'
        },
        register: '/mobile/v1/phone/register',
        user: '/mobile/v2/user',
        refresh: {
            url: '/mobile/v1/refresh_token',
            method: 'post'
        },
    },
    user: {
        property: 'user',
    }
})

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
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)
    .use(router)
    .use(i18n)
    .use(api, {
        baseUrl: 'https://api.carting.uz/api'
    })

    .mount('#app')


