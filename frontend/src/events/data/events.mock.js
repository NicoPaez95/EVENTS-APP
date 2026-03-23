/**
 * @typedef {Object} Event
 * @property {string|number} id - Unique identifier for the event.
 * @property {string} title - The official name or headline of the event.
 * @property {string} date - Event date in ISO format (YYYY-MM-DD).
 * @property {string} location - Venue, city, or geographical point of the experience.
 * @property {string} category - The domain classification (e.g., Tech, Music, Art, Food).
 * @property {boolean} isFeatured - Flag to display the event in high-impact hero sections or carousels.
 * @property {boolean} isRecommended - Flag to highlight the event in secondary recommendation sidebars.
 * @property {string} image - URL for the promotional banner or cover image.
 * @property {string} [description] - Optional short summary of the event for previews.
 */

/**
 * Main Event Catalog Mock Data.
 * * This serves as the primary "Source of Truth" for the application during development.
 * It centralizes all event attributes to ensure consistency across Features.
 * @type {Event[]}
 * @category Data
 */
export const events = [
  {
    id: 'e1',
    title: 'React Conference',
    date: '2026-03-15',
    location: 'Buenos Aires',
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
    location: 'Córdoba',
    category: 'Music',
    isFeatured: false,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800'
  },
  {
    id: 'e3',
    title: 'Art Exhibition',
    date: '2026-05-10',
    location: 'Mendoza',
    category: 'Art',
    isFeatured: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1460666819451-7410f58939b0?q=80&w=800'
  },
  {
    id: 'e4',
    title: 'Food Festival',
    date: '2026-06-20',
    location: 'Santa Fe',
    category: 'Food',
    isFeatured: false,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800'
  },
  {
    id: 'e5',
    title: 'Tech Conference',
    date: '2026-07-05',
    location: 'Mendoza',
    category: 'Tech',
    isFeatured: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800'
  },
  {
    id: 'e6',
    title: 'Art Exhibition',
    date: '2026-08-15',
    location: 'Córdoba',
    category: 'Art',
    isFeatured: false,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=800'
  },
];