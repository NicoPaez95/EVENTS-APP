import { useState, useEffect } from 'react';

/**
 * Custom Hook: useWeather.
 * * Logic to fetch real-time weather data from OpenWeatherMap API.
 * It manages the lifecycle of the request, including loading and error states.
 * * @hook
 * @category Hooks
 * @param {string} [location='Cordoba,AR'] - The city and country code to fetch.
 * @returns {Object} An object containing:
 * - {Object|null} weather: The formatted weather data (temp, condition, city, icon).
 * - {boolean} loading: True while the fetch request is in progress.
 * - {string|null} error: Error message if the request fails.
 */
export const useWeather = (location = 'Cordoba,AR') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchWeather = async () => {
      if (!API_KEY) {
        setError("Missing API Key in environment variables.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Location not found: ${location}`);
        }

        const data = await response.json();
        
        if (isMounted) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            city: data.name,
            icon: data.weather[0].icon,
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, [location, API_KEY]);

  return { weather, loading, error };
};