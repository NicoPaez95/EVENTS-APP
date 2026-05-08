/**
 * @file weather-controller.js
 * @description Proxy controller to fetch weather data from external APIs.
 * This implementation protects sensitive API keys by keeping them server-side
 * and normalizes the data structure for frontend consumption.
 * @module controllers/weather-controller
 * @author Nico Paez
 */

import HttpError from '../models/http-error.js';

/**
 * Retrieves weather metrics for a specified city.
 * 
 * @async
 * @function getWeatherByCity
 * @param {import('express').Request} req - Express request object, containing 'city' in params.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function for error handling.
 * @returns {Promise<void>} Sends a JSON response with normalized weather data.
 */
export const getWeatherByCity = async (req, res, next) => {
    const city = req.params.city || 'Cordoba,AR';
    const API_KEY = process.env.WEATHER_API_KEY;
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // Security check: Ensure the API key is present in environment variables
    if (!API_KEY) {
        const error = new HttpError(
            'Weather service configuration error: Missing API Key.',
            500
        );
        return next(error);
    }

    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
        );

        // Validate external API response status
        if (!response.ok) {
            const error = new HttpError(
                `External weather service responded with status: ${response.status}`,
                response.status
            );
            return next(error);
        }

        const data = await response.json();

        /**
         * Data Normalization:
         * Only essential fields are dispatched to the client to reduce payload size
         * and decouple the frontend from the external API's schema.
         */
        res.status(200).json({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            city: data.name,
            icon: data.weather[0].icon,
        });
    } catch (err) {
        // Catch-all for network failures or parsing errors
        const error = new HttpError(
            'Fetching weather data failed due to a network or server error.',
            500
        );
        return next(error);
    }
};