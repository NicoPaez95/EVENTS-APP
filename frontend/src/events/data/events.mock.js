/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name of the event.
 * @property {string} date - Event date in YYYY-MM-DD format.
 * @property {string} location - Venue or city where the event takes place.
 * @property {string} category - The domain category (e.g., Tech, Music, Art).
 * @property {string} [image] - Optional URL for the promotional banner.
 */

/**
 * Main Event Catalog Mock Data.
 * * Central repository of available events for the discovery and 
 * filtering features.
 * * @type {Event[]}
 */
export const events = [
  {
    id: 'e1',
    title: 'React Conference',
    date: '2026-03-15',
    location: 'Buenos Aires',
    category: 'Tech',
  },
  {
    id: 'e2',
    title: 'Music Festival',
    date: '2026-04-02',
    location: 'Córdoba',
    category: 'Music',
  },
  {
    id: 'e3',
    title: 'Art Exhibition',
    date: '2026-05-10',
    location: 'Mendoza',
    category: 'Art',
  },
  {
    id: 'e4',
    title: 'Food Festival',
    date: '2026-06-20',
    location: 'Santa Fe',
    category: 'Food',
  },
  {
    id: 'e5',
    title: 'Tech Conference',
    date: '2026-07-05',
    location: 'Mendoza',
    category: 'Tech',
  },
  {
    id: 'e6',
    title: 'Art Exhibition',
    date: '2026-08-15',
    location: 'Cordoba',
    category: 'Art',
  },
];