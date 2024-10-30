import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['de', 'en', 'pt', 'uk', 'es', 'fr', 'ar', 'tr', 'ru', 'it', 'pl', 'sv', 'no', 'zh-CN', 'ja', 'th', 'hi', 'id'],
        fallbackLng: 'de',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;