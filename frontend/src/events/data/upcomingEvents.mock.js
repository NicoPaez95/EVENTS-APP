/**
 * @typedef {Object} UpcomingEvent
 * @property {string|number} id - Unique identifier for the upcoming event.
 * @property {string} title - Name of the artist, match, or event.
 * @property {string} date - Event date in YYYY-MM-DD format for chronological sorting.
 */

/**
 * Mock data for the Upcoming Events sidebar/widget.
 * * This collection focuses on immediate events, providing a simplified 
 * schema for quick scanning in the UI.
 * * @type {UpcomingEvent[]}
 */
export const upcomingEvents = [
  {
    id: 'u1',
    title: 'Coldplay',
    date: '2026-03-12',
  },
  {
    id: 'u2',
    title: 'Boca vs River',
    date: '2026-03-18',
  },
  {
    id: 'u3',
    title: 'Duki',
    date: '2026-03-25',
  },
];