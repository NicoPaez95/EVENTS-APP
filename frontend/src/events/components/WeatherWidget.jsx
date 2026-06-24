/**
 * @file WeatherWidget.jsx
 * @description Presentational UI component that displays aggregated weather statistics in a compact grid card.
 * Designed to adapt visually within sidebars or dynamic contextual event detail panels.
 * @module features/events/components/WeatherWidget
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * WeatherWidget Component.
 *
 * Presentational shell painting telemetry data metrics. Relies exclusively on static incoming properties
 * containing fully-formed primitives and pre-translated descriptive strings.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {number} props.temp - Current resolved temperature in Celsius metrics.
 * @param {string} props.condition - Already localized main weather condition status string.
 * @param {string} props.city - Name string of the targeted physical city location.
 * @param {string} props.icon - OpenWeatherMap tracking alpha-numeric asset code string.
 * @returns {React.JSX.Element} A stationary styled article viewport hosting layout weather assets.
 */
const WeatherWidget = ({ temp, city, icon, condition }) => {
  /**
   * Encapsulates remote asset compilation linking global open weather icon CDN paths.
   */
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <article className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl shadow-lg text-white animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-medium opacity-80 uppercase tracking-wider">
            {city}
          </p>
          <h3 className="text-4xl font-bold mt-1">{temp}°C</h3>
          <p className="text-sm font-medium capitalize mt-1">{condition}</p>
        </div>

        <div className="bg-white/20 rounded-full p-2">
          <img
            src={iconUrl}
            alt={condition}
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </article>
  );
};

WeatherWidget.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default WeatherWidget;
