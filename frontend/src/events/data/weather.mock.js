/**
 * @typedef {Object} WeatherData
 * @property {number} temperature - Current temperature value in Celsius.
 * @property {string} location - Name of the city or region for the weather report.
 * @property {string} condition - Human-readable description of the weather (e.g., 'Sunny').
 * @property {string} icon - Emoji or icon identifier representing the current condition.
 */

/**
 * Mock data for the Weather Feature.
 * * Provides simulated real-time environmental data to the WeatherWidget.
 * * This object is used with the spread operator in WeatherFeature.jsx.
 * * @type {WeatherData}
 */
export const weatherMock = {
  temperature: 24,
  location: 'Buenos Aires',
  condition: 'Parcialmente soleado',
  icon: '☀️',
};