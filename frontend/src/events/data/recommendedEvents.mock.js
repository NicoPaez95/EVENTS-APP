/**
 * @typedef {Object} RecommendedEvent
 * @property {string|number} id - Unique identifier for the recommended item.
 * @property {string} title - The event title or headline.
 * @property {string} date - Event date formatted as YYYY-MM-DD.
 * @property {string} location - Venue name or geographic location.
 */

/**
 * Mock data for the Recommended Events section.
 * * These events are curated based on popularity or user interest 
 * and are displayed in summary format.
 * * @type {RecommendedEvent[]}
 */
export const recommendedEvents = [
  {
    id: 'r1',
    title: 'Rock Night',
    date: '2026-03-22',
    location: 'Estadio River',
  },
  {
    id: 'r2',
    title: 'Startup Meetup',
    date: '2026-04-10',
    location: 'Buenos Aires',
  },
  {
    id: 'r3',
    title: 'Arte Urbano',
    date: '2026-05-01',
    location: 'Córdoba',
  },
];