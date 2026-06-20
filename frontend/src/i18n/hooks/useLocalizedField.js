import { useTranslation } from "react-i18next";

/**
 * Extracts the correct language value from a bilingual backend field.
 * Handles both bilingual objects { en, es } and plain strings defensively.
 *
 * @param {Object|string} field - Bilingual field { en: string, es: string } or plain string.
 * @returns {string} The localized value for the active language.
 */
const useLocalizedField = (field) => {
    const { i18n } = useTranslation();
    const lang = i18n.language?.slice(0, 2) || "en";

    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] ?? field.en ?? "";
};

export default useLocalizedField;