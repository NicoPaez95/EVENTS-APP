/**
 * @file useWeather.js
 * @description Custom Hook to manage weather data fetching from the application's backend.
 * Implements the Proxy Pattern logic by consuming the internal weather endpoint
 * instead of direct external API calls.
 * @module hooks/useWeather
 * @author Nico Paez
 */

import { useState, useEffect } from 'react';

/**
 * Custom Hook: useWeather.
 * Orchestrates the lifecycle of weather data requests, managing loading, 
 * success, and error states.
 * 
 * @hook
 * @category Hooks/Shared
 * @param {string} [location='Cordoba,AR'] - The city and country code to fetch data for.
 * @returns {Object} An object containing:
 * - {Object|null} weather: Normalized weather data (temp, condition, city, icon).
 * - {boolean} loading: Operational status of the asynchronous request.
 * - {string|null} error: Error message if the request fails.
 */
export const useWeather = (location = 'Cordoba,AR') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** 
   * API Base URL resolution:
   * Prioritizes Vite environment variables, falling back to Create React App 
   * standards or a local default if neither is present.
   */
  const API_BASE_URL =
    import.meta.env?.VITE_API_URL ||
    process.env.REACT_APP_API_URL ||
    'http://localhost:5000/api';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    /**
     * Internal Fetch Orchestrator:
     * Communicates with the backend proxy to retrieve meteorological data.
     */
    const fetchWeather = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/weather/${location}`);

        if (!response.ok) {
          throw new Error(`Weather service responded with status: ${response.status}`);
        }

        const data = await response.json();

        // State update only if the component remains mounted to prevent memory leaks
        if (isMounted) {
          setWeather(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Weather data unavailable');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    // Cleanup function to invalidate the request if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [location, API_BASE_URL]);

  return { weather, loading, error };
};