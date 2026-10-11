import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const RTL_LANGUAGES = ['ar'];

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['de', 'en', 'pt', 'uk', 'es', 'fr', 'ar', 'tr', 'ru', 'it', 'pl', 'sv', 'no', 'zh-CN', 'ja', 'th', 'hi', 'id'],
        fallbackLng: 'de',
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

// Keep <html lang/dir> in sync for screen readers and right-to-left languages
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
    document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
});

export default i18n;
