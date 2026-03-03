// =====================================
// WeatherWidget Component
// -------------------------------------
// Displays current weather information
// including temperature, location,
// weather condition and an icon.
//
// Pure presentational component.
// Receives weather data via props and
// renders a visual summary widget.
//
// Expected props:
// {
//   temperature: number | string,
//   location: string,
//   condition: string,
//   icon: ReactNode
// }
// =====================================

const WeatherWidget = ({ temperature, location, condition, icon }) => {
  return (
    <section className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl p-6 shadow-lg min-h-[300px] flex flex-col justify-between border border-blue-300">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Clima
        </h2>
        
        {/* Main Weather Info */}
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-4xl font-bold text-slate-900">
              {temperature}°
            </p>
            <p className="text-sm text-slate-600">
              {location}
            </p>
          </div>

          <div className="text-5xl text-slate-700">
            {icon}
          </div>

        </div>
      </div>

      {/* Weather Condition */}
      <div className="text-sm text-slate-700 mt-6">
        {condition}
      </div>

    </section>
  );
};

export default WeatherWidget;