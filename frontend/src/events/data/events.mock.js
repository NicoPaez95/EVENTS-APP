/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name of the event.
 * @property {string} date - Event date in YYYY-MM-DD format.
 * @property {string} location - Venue or city where the event takes place.
 * @property {string} category - The domain category (e.g., Tech, Music, Art).
 * @property {boolean} isRecommended - Flag to highlight the event in the sidebar/recommendations.
 * @property {string} [image] - Optional URL for the promotional banner.
 */

/**
 * Main Event Catalog Mock Data.
 * @type {Event[]}
 */
export const events = [
  {
    id: 'e1',
    title: 'React Conference',
    date: '2026-03-15',
    location: 'Buenos Aires',
    category: 'Tech',
    isRecommended: false,
  },
  {
    id: 'e2',
    title: 'Music Festival',
    date: '2026-04-02',
    location: 'Córdoba',
    category: 'Music',
    isRecommended: false,
  },
  {
    id: 'e3',
    title: 'Art Exhibition',
    date: '2026-05-10',
    location: 'Mendoza',
    category: 'Art',
    isRecommended: true,
  },
  {
    id: 'e4',
    title: 'Food Festival',
    date: '2026-06-20',
    location: 'Santa Fe',
    category: 'Food',
    isRecommended: true,
  },
  {
    id: 'e5',
    title: 'Tech Conference',
    date: '2026-07-05',
    location: 'Mendoza',
    category: 'Tech',
    isRecommended: true,
  },
  {
    id: 'e6',
    title: 'Art Exhibition',
    date: '2026-08-15',
    location: 'Cordoba',
    category: 'Art',
    isRecommended: false,
  },
];