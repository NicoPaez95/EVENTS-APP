/**
 * @file users-routes.js
 * @description Route definitions for User-related operations.
 * Maps HTTP endpoints to the corresponding controller logic and applies security guards.
 * @module routes/users-routes
 * @author Nico Paez
 */

import express from 'express';
import * as usersController from '../controllers/users-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

/**
 * Public Authentication Routes
 * Provides endpoints for user onboarding and session establishment.
 * These routes do not require an authorization token.
 */
router.post('/register', usersController.register);
router.post('/login', usersController.login);

/**
 * Authentication Middleware Barrier
 * All routes defined below this point require a valid JWT token.
 * Validates the "Authorization: Bearer <token>" header before proceeding.
 */
router.use(checkAuth);

/**
 * Protected User Preference Routes
 * Endpoints to manage user-specific event collections. 
 * Ownership is verified by comparing the token identity with the requested UID.
 */
router.get('/:uid/saved', usersController.getSavedEvents);
router.patch('/:uid/saved', usersController.updateSavedEvents);

/**
 * Protected Administrative Routes
 * Access restricted to authenticated users for system-wide data retrieval.
 */
router.get('/', usersController.getUsers);

export default router;