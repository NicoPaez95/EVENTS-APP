/**
 * WeatherWidget Component.
 * * A presentational UI component that displays weather data in a compact card.
 * Designed to be used within sidebars or contextual detail panels.
 * * @component
 * @category Components
 * @param {Object} props - Component properties.
 * @param {number} props.temp - Current temperature in Celsius.
 * @param {string} props.condition - Main weather condition (e.g., 'Clouds').
 * @param {string} props.city - Name of the city fetched.
 * @param {string} props.icon - OpenWeatherMap icon code.
 * @returns {JSX.Element} A styled article with weather information.
 */
const WeatherWidget = ({ temp, condition, city, icon }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <article className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl shadow-lg text-white animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-medium opacity-80 uppercase tracking-wider">{city}</p>
          <h3 className="text-4xl font-bold mt-1">{temp}°C</h3>
          <p className="text-sm font-medium capitalize mt-1">{condition}</p>
        </div>
        
        <div className="bg-white/20 rounded-full p-2">
          <img src={iconUrl} alt={condition} className="w-16 h-16 object-contain" />
        </div>
      </div>
    </article>
  );
};

export default WeatherWidget;