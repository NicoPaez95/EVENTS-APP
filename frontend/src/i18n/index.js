/**
 * @file index.js
 * @description Internationalization (i18n) core configuration module.
 * Initializes i18next with runtime language detection and react bindings,
 * registering structural namespaces for data and local user interfaces.
 * @module i18n/index
 * @author Nico Paez
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enEvents from "./locales/en/events.json";
import esEvents from "./locales/es/events.json";
/*
import enUi from "./locales/en/ui.json";
import esUi from "./locales/es/ui.json";
import enUser from "./locales/en/user.json";
import esUser from "./locales/es/user.json";
*/
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { events: enEvents },
            es: { events: esEvents },

            /* en: { events: enEvents, ui: enUi, user: enUser },
             es: { events: esEvents, ui: esUi, user: esUser },*/
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;