import {createApp} from 'vue'
import '@/assets/styles/style.scss';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {createPinia} from 'pinia';
import router from '@/router/router';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import auth from '@/modules/auth';
import api from '@/plugins/api'
import {vMaska} from 'maska'
//// PRIME ICONS
import 'primeicons/primeicons.css'
import i18n from '@/i18n';

const app = createApp(App);
app.use(createPinia())
app.use(i18n)
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
    token: {
        global: true
    },
    user: {
        fetchUser: false,
        property: 'user',
    }
})
app.use(ToastService);
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

const profileRoutes = ['profile-main', 'profile-referral']
router.beforeEach(async (to, from, next) => {
    const tokensStatus = app.config.globalProperties.$auth.token.status();
    const refreshTokensStatus = app.config.globalProperties.$auth.token.status();
    if (!app.config.globalProperties.$auth.user && tokensStatus.valid()) {
        await app.config.globalProperties.$auth.fetchUser()
    }
    if (profileRoutes.includes(to.name)) {
        if (tokensStatus.valid()) {
            return next();
        } else {
            if (tokensStatus.expired() && refreshTokensStatus.valid()) {
                return app.config.globalProperties.$auth.refresh().then(() => {
                    return next();
                });
            } else if (refreshTokensStatus.expired() || refreshTokensStatus.unknown()) {
                return next(from.path || '/');
            }

            return next()
        }
    } else {
        next()
    }

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


