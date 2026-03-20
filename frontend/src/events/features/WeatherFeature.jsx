import { useWeather } from '../../shared/hooks/useWeather';
import WeatherWidget from '../components/WeatherWidget';

/**
 * WeatherFeature Component.
 * * Acts as a Smart Component (Orchestrator) for the weather domain.
 * It consumes the useWeather hook and manages the conditional rendering
 * for loading, error, and success states.
 * * @component
 * @category Features
 * @param {Object} props - Component properties.
 * @param {string} [props.location='Cordoba,AR'] - The location to display.
 * @returns {JSX.Element} The rendered weather experience.
 */
const WeatherFeature = ({ location = 'Cordoba,AR' }) => {
  const { weather, loading, error } = useWeather(location);

  // --- Conditional Rendering ---
  
  if (loading) {
    return (
      <div className="p-5 bg-slate-100 rounded-2xl animate-pulse flex flex-col gap-2 h-32 justify-center">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-8 w-16 bg-slate-200 rounded" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-4 border border-dashed border-slate-200 rounded-2xl text-center">
        <p className="text-xs text-slate-400 italic">Weather update unavailable</p>
      </div>
    );
  }

  return <WeatherWidget {...weather} />;
};

export default WeatherFeature;