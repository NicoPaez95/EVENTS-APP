/**
 * @typedef {Object} Venue
 * @property {string} name - The specific building or place (e.g., 'Quality Espacio').
 * @property {string} city - The city where the venue is located.
 * @property {number} lat - Geographical latitude for map rendering.
 * @property {number} lng - Geographical longitude for map rendering.
 */

/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name or headline of the event.
 * @property {string} date - Event date in ISO format (YYYY-MM-DD).
 * @property {Venue} venue - Detailed location data including coordinates.
 * @property {string} category - The domain classification (e.g., Tech, Music, Art, Food).
 * @property {boolean} isFeatured - Flag for high-impact hero sections.
 * @property {boolean} isRecommended - Flag for secondary recommendation sidebars.
 * @property {string} image - URL for the promotional banner.
 * @property {string} [description] - Optional short summary for previews.
 */

/**
 * Main Event Catalog Mock Data.
 * Updated to include geolocation coordinates and specific venue names.
 * @type {Event[]}
 * @category Data
 */
export const events = [
  {
    id: 'e1',
    title: 'React Conference',
    date: '2026-03-15',
    venue: {
      name: 'Centro Cultural Konex',
      city: 'Buenos Aires',
      lat: -34.6063,
      lng: -58.4103
    },
    category: 'Tech',
    isFeatured: true,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
    description: 'The premier gathering for React enthusiasts in Latin America.'
  },
  {
    id: 'e2',
    title: 'Music Festival',
    date: '2026-04-02',
    venue: {
      name: 'Plaza de la Música',
      city: 'Córdoba',
      lat: -31.4055,
      lng: -64.1974
    },
    category: 'Music',
    isFeatured: false,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800'
  },
  {
    id: 'e3',
    title: 'Art Exhibition',
    date: '2026-05-10',
    venue: {
      name: 'Museo de Arte Moderno',
      city: 'Mendoza',
      lat: -32.8894,
      lng: -68.8458
    },
    category: 'Art',
    isFeatured: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1460666819451-7410f58939b0?q=80&w=800'
  },
  {
    id: 'e4',
    title: 'Food Festival',
    date: '2026-06-20',
    venue: {
      name: 'Estación Belgrano',
      city: 'Santa Fe',
      lat: -31.6375,
      lng: -60.6923
    },
    category: 'Food',
    isFeatured: false,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800'
  },
  {
    id: 'e5',
    title: 'Tech Conference',
    date: '2026-07-05',
    venue: {
      name: 'Arena Maipú',
      city: 'Mendoza',
      lat: -32.9774,
      lng: -68.7842
    },
    category: 'Tech',
    isFeatured: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800'
  },
  {
    id: 'e6',
    title: 'Art Exhibition',
    date: '2026-08-15',
    venue: {
      name: 'Museo Caraffa',
      city: 'Córdoba',
      lat: -31.4287,
      lng: -64.1848
    },
    category: 'Art',
    isFeatured: false,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=800'
  },
];