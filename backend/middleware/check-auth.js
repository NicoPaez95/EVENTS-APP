/**
 * @file check-auth.js
 * @description Middleware to validate JWT tokens and protect private routes.
 * Ensures the request contains a valid authorization header and attaches the user identity to the request object.
 * @module middleware/check-auth
 * @author Nico Paez
 */

import jwt from 'jsonwebtoken';
import HttpError from '../models/http-error.js';

/**
 * Validates the incoming JWT token from the Authorization header.
 * 
 * @function checkAuth
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Calls next() if authentication is successful, otherwise forwards an HttpError.
 */
export default (req, res, next) => {
    /**
     * Skip authentication for OPTIONS requests to handle CORS preflight.
     */
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        /**
         * Extract token from the "Authorization: Bearer <TOKEN>" header.
         */
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Authentication failed!');
        }

        /**
         * Verify the token using the secret key and decode the payload.
         */
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_KEY || 'supersecret_dont_share'
        );

        /**
         * Attach the decoded userId to the request object for use in protected controllers.
         */
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
    }
};