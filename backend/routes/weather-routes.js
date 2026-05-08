/**
 * @file weather-routes.js
 * @description Route definitions for Weather-related operations.
 * Acts as a proxy layer to fetch meteorological data via internal controllers.
 * @module routes/weather-routes
 * @author Nico Paez
 */

import express from 'express';
import { getWeatherByCity } from '../controllers/weather-controller.js';

const router = express.Router();

/**
 * @route GET /api/weather/:city
 * @description Retrieves real-time weather data for a specific location.
 * @access Public
 * @param {string} city - The name of the city (e.g., 'Cordoba,AR').
 */
router.get('/:city', getWeatherByCity);

export default router;