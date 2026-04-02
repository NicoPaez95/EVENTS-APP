/**
 * @file events-routes.js
 * @description Routing configuration for event-related endpoints.
 * Maps HTTP methods and URL paths to the corresponding controller functions.
 * @module routes/events
 * @author Nico Paez
 */

import express from 'express';
import * as eventsController from '../controllers/events-controller.js';

/** * Express Router instance for event-based paths.
 * @type {import('express').Router} 
 */
const router = express.Router();

/**
 * @route   GET /api/events/
 * @desc    Retrieve a comprehensive list of all events in the system.
 * @access  Public
 */
router.get('/', eventsController.getAllEvents);

/**
 * @route   GET /api/events/:eid
 * @desc    Fetch detailed information for a specific event by its unique ID.
 * @access  Public
 * @param   {string} eid - The unique event identifier (UUID/ObjectId).
 */
router.get('/:eid', eventsController.getEventById);

/**
 * @route   GET /api/events/user/:uid
 * @desc    Retrieve all event entries associated with a specific creator ID.
 * @access  Public
 * @param   {string} uid - The unique user identifier.
 */
router.get('/user/:uid', eventsController.getEventByUserId);

export default router;