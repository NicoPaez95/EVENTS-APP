/**
 * @file app.js
 * @description Core entry point for the Events App Backend. 
 * Orchestrates Express configuration, database connectivity, 
 * cross-origin resource sharing (CORS), and centralized error dispatching.
 * @author Nico Paez
 * @version 1.0.0
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import HttpError from './models/http-error.js';
import eventsRoutes from './routes/events-routes.js';
import userRoutes from './routes/users-routes.js';
import { connectDB } from './config/db.js';

// Initialize environment variables configuration
dotenv.config();

// Establish asynchronous connection to the database
connectDB();

/** * Express application instance.
 * @type {import('express').Application} 
 */
const app = express();

/**
 * Middleware: Body Parser.
 * Intercepts and parses incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Middleware: CORS Policy Handler.
 * Configures security headers to enable controlled cross-origin interaction 
 * between the React frontend and this API.
 */
app.use(cors({
  origin: 'http://localhost:3000', // Tu frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));
/**
 * Domain-Specific Routes.
 * Mounting the events module at the /api/events prefix.
 */
app.use('/api/events', eventsRoutes);

/**
 * Domain-Specific Routes.
 * Mounting the users module at the /api/users prefix.
 */
app.use('/api/users', userRoutes);

/**
 * Middleware: Unhandled Route Interceptor.
 * Acts as a fallback for any incoming request that does not match 
 * the defined API endpoints.
 * @throws {HttpError} 404 - Exception indicating the requested route was not found.
 */
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

/**
 * Middleware: Global Error Pipeline.
 * Standardizes API error responses. Ensures the client always receives 
 * a structured JSON payload even during catastrophic failures.
 * * @param {HttpError|Error} error - The caught exception.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
app.use((error, req, res, next) => {
  // If headers have already been sent to the client, delegate to the default Express error handler.
  if (res.headerSent) {
    return next(error);
  }
  
  res.status(error.code || 500);
  res.json({ 
    message: error.message || 'An internal server error occurred!',
    status: error.code || 500
  });
});

/** * Server execution port.
 * @type {number|string} 
 */
const PORT = process.env.PORT || 5000;

/**
 * Bootstrap: Server Initialization.
 * Launches the listener and logs environment details to the console.
 */
app.listen(PORT, () => {
  console.log(`
  🚀 Server properly initialized!
  📡 API Base URL: http://localhost:${PORT}/api/events
  🛠️  Execution Mode: ${process.env.NODE_ENV || 'Development'}
  `);
});