import app_en from './locales/app_en.json'
import app_ru from './locales/app_ru.json'
import app_uz from './locales/app_uz.json'
import app_kk from './locales/app_kk.json'

import {createI18n} from "vue-i18n";

export enum Language {
    EN = 'en',
    RU = 'ru',
    UZ = 'uz',
    KK = 'kk'
}

const defaultLanguage = Language.EN

const i18n = createI18n({
    locale: defaultLanguage,
    messages: {
        en: app_en,
        ru: app_ru,
        uz: app_uz,
        kk: app_kk
    },
    fallbackLocale: defaultLanguage,
    legacy: false,
    globalInjection: true
})

export default i18n
