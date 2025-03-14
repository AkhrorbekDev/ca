import app_en from './locales/app_en.json'
import app_ru from './locales/app_ru.json'
import app_uz from './locales/app_uz.json'
import app_kk from './locales/app_kk.json'

import {createI18n} from "vue-i18n";

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: app_en,
        ru: app_ru,
        uz: app_uz,
        kk: app_kk
    },
    fallbackLocale: 'uz',
    legacy: false,
    globalInjection: true
})

export default i18n
