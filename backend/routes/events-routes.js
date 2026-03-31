/**
 * @file events-routes.js
 * @description Route definitions for event-related endpoints.
 * @module routes/events
 */

import express from 'express';
import * as eventsController from '../controllers/events-controller.js';

/** @type {express.Router} */
const router = express.Router();

/**
 * @route GET /api/events/:eid
 * @description Get a specific event by its unique ID.
 * @access Public
 * @param {string} eid - The Event ID (e.g., 'p1').
 */
router.get('/:eid', eventsController.getEventById);

/**
 * @route GET /api/events/user/:uid
 * @description Get all events created by a specific user.
 * @access Public
 * @param {string} uid - The User ID (e.g., 'u1').
 */
// router.get('/user/:uid', eventsController.getEventByUserId);

export default router;