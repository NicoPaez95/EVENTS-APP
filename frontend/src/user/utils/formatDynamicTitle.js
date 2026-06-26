// /src/user/utils/formatDynamicTitle.js
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Formats a standardized date string into an uppercase localized header string.
 * Converts strict literal date formats (YYYY-MM-DD) into uppercase operational titles
 * specifically matching Spanish grammatical constructs for calendar feed markers.
 *
 * @param {string} dateString - Clean ISO-compliant sequence identifier or literal target date.
 * @returns {string} Fully capitalized title context (e.g., "EVENTOS DEL 15 DE ENERO").
 */
export const formatDynamicTitle = (dateString) => {
    try {
        const parsedDate = parseISO(dateString);
        return `EVENTOS DEL ${format(parsedDate, "d 'DE' MMMM", { locale: es })}`.toUpperCase();
    } catch {
        return `EVENTOS PARA ${dateString}`.toUpperCase();
    }
};