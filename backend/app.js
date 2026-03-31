/**
 * @file app.js
 * @description Main entry point for the Events App Backend. 
 * Configures Express, Middlewares, CORS, and Global Error Handling.
 * @author Nico Paez
 */

import express from 'express';
import dotenv from 'dotenv';
import HttpError from './models/http-error.js';
import eventsRoutes from './routes/events-routes.js';

// Load environment variables from .env file
dotenv.config();

/** @type {express.Application} */
const app = express();

/**
 * Middleware: Parse incoming JSON payloads.
 */
app.use(express.json());

/**
 * Middleware: CORS Configuration.
 * Sets headers to allow cross-origin requests from the React frontend.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

/**
 * Domain Routes
 */
app.use('/api/events', eventsRoutes);

/**
 * Middleware: 404 Route Handler.
 * Triggered when no previous routes match the request.
 * @throws {HttpError} 404 - Could not find this route.
 */
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

/**
 * Middleware: Global Error Handling.
 * Standardizes error responses across the entire application.
 * @param {HttpError} error - The error object containing message and code.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 */
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

/** @type {number|string} */
const PORT = process.env.PORT || 5000;

/**
 * Bootstrap the server.
 */
app.listen(PORT, () => {
  console.log(`
  🚀 Server running!
  📡 API: http://localhost:${PORT}/api/events
  🛠️  Mode: Development
  `);
});