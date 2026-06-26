/**
 * @file index.js
 * @description Core internationalization (i18n) configuration module.
 * Initializes i18next with structural bundle splitting using explicit namespaces
 * (`events` and `shared`) for domain-specific data and ambient layout components.
 * Integrates runtime browser language detection and React 19 architecture context bindings.
 * @module i18n/index
 * @author Nico Paez
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Domain specific locale resources
import enEvents from "./locales/en/events.json";
import esEvents from "./locales/es/events.json";

// Shared/Ambient layout component resources
import enShared from "./locales/en/shared.json";
import esShared from "./locales/es/shared.json";

/**
 * i18next Initialization Pipeline
 * Configures localization capabilities across decoupled layers using bundled JSON targets.
 * 
 * - `LanguageDetector`: Scans browser storage, headers, cookies, and query strings for target locales.
 * - `initReactI18next`: Bridges i18next lifecycle hooks directly into React hooks and Context API.
 */
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        /**
         * Static dictionary containing memory-allocated key-value schemas.
         * Separated into structural translation namespaces to optimize lookups.
         * @type {object}
         */
        resources: {
            en: {
                events: enEvents,
                shared: enShared
            },
            es: {
                events: esEvents,
                shared: esShared
            },
        },
        /**
         * Primary initialization language.
         * Overrides detector evaluations if standard fallback processing is required.
         * @type {string}
         */
        lng: "en",
        /**
         * Fallback locale strategy if the requested dictionary keys do not exist in the active profile.
         * @type {string}
         */
        fallbackLng: "en",
        /**
         * Configuration options for string interpolations.
         */
        interpolation: {
            /**
             * Disables manual character escaping. 
             * Safe to mark false since React automatically serializes output to protect against XSS injections.
             * @type {boolean}
             */
            escapeValue: false
        },
    });

export default i18n;