import { weatherMock } from '../data/weather.mock';
import WeatherWidget from '../components/WeatherWidget';

const WeatherFeature = () => {
  return <WeatherWidget {...weatherMock} />;
};

export default WeatherFeature;