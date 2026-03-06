import { weatherMock } from '../data/weather.mock';
import WeatherWidget from '../components/WeatherWidget';

/**
 * WeatherFeature Component.
 * * A specialized feature container that integrates weather data into the application.
 * * It acts as a data-mapping layer, using the spread operator to inject 
 * mock weather properties (temperature, location, condition, icon) 
 * directly into the WeatherWidget.
 * * @component
 * @returns {JSX.Element} The WeatherWidget populated with real-time or mock data.
 */
const WeatherFeature = () => {
  /* Using the spread operator {...weatherMock} is an efficient way 
     to pass all properties from the mock object as individual props 
     to the WeatherWidget, keeping the code clean and concise.
  */
  return <WeatherWidget {...weatherMock} />;
};

export default WeatherFeature;