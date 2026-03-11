/**
 * WeatherWidget Component.
 * * A purely presentational widget that displays real-time weather information.
 * * It features a stylized gradient background and uses a flexbox layout 
 * to organize temperature, location, and weather conditions.
 * * @component
 * @param {Object} props - Component properties.
 * @param {number|string} props.temperature - Current numeric temperature.
 * @param {string} props.location - City or area name (e.g., Córdoba).
 * @param {string} props.condition - Short description of the weather (e.g., Sunny).
 * @param { {import("react").React.RNode}} props.icon - A React element or icon component representing the condition.
 * @returns {JSX.Element} A visual weather summary card.
 */
const WeatherWidget = ({ temperature, location, condition, icon }) => {
  return (
    <section className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl p-6 shadow-lg min-h-[300px] flex flex-col justify-between border border-blue-300">
      
      {/* Header section with title */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Clima
        </h2>
        
        {/* Main Weather Information Display */}
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-4xl font-bold text-slate-900">
              {temperature}°
            </p>
            <p className="text-sm text-slate-600">
              {location}
            </p>
          </div>

          {/* Icon placeholder for weather conditions */}
          <div className="text-5xl text-slate-700">
            {icon}
          </div>

        </div>
      </div>

      {/* Narrative weather condition footer */}
      <div className="text-sm text-slate-700 mt-6">
        {condition}
      </div>

    </section>
  );
};

export default WeatherWidget;