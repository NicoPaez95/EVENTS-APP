/**
 * @file users-routes.js
 * @description Route definitions for User-related operations.
 * Maps HTTP endpoints to the corresponding controller logic.
 * @module routes/users-routes
 * @author Nico Paez
 */

import express from 'express';
import * as usersController from '../controllers/users-controller.js';

const router = express.Router();

/**
 * Authentication Routes
 * Public access for session management.
 */
router.post('/register', usersController.register);
router.post('/login', usersController.login);

/**
 * User Preference Routes (Saved Events)
 * Protected routes for managing user-specific event collections.
 * @requires Authentication Middleware (to be added in next sprint)
 */
router.get('/:uid/saved', usersController.getSavedEvents);
router.patch('/:uid/saved', usersController.updateSavedEvents);

/**
 * Administrative Routes
 * Restricted access for user management.
 */
router.get('/', usersController.getUsers);

export default router;