import { startOfMonth, getDaysInMonth, getDay } from 'date-fns';

/**
 * Generates the structural data required to render a responsive monthly calendar grid.
 * * **Logic Overview**:
 * This helper calculates the offsets needed to align the 1st day of the month with its 
 * corresponding day of the week (Sunday through Saturday). It uses "blanks" to provide 
 * the necessary padding for CSS Grid or Flexbox layouts.
 * * @function
 * @category Utils/Date
 * @param {Date} date - An object representing any day within the target month.
 * @returns {Object} monthData
 * @returns {number[]} monthData.days - An array containing the sequence of days [1, 2, ... N].
 * @returns {number[]} monthData.blanks - An array of indices representing the empty 
 * leading cells for the first week of the month.
 */
export const getCalendarGrid = (date) => {
    // 1. Identify the exact starting point of the month
    const monthStart = startOfMonth(date);

    // 2. Retrieve the total count of days (handle 28, 29, 30, or 31 days)
    const totalDays = getDaysInMonth(date);

    // 3. Determine the weekday index of the 1st (0 = Sunday, 6 = Saturday)
    const startDayOfWeek = getDay(monthStart);

    return {
        /** * Generates an iterable array of day numbers.
         * Used for mapping the "active" date cells in the UI.
         */
        days: Array.from({ length: totalDays }, (_, i) => i + 1),

        /** * Generates an array of empty slots for grid alignment.
         * These slots represent days from the previous month that occupy the first week row.
         */
        blanks: Array.from({ length: startDayOfWeek }, (_, i) => i)
    };
};