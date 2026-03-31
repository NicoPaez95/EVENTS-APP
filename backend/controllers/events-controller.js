/**
 * @file events-controller.js
 * @description Logic for handling event-related requests.
 * @module controllers/events
 */

import HttpError from '../models/http-error.js';

/**
 * @typedef {Object} Location
 * @property {number} lat - Latitude coordinate.
 * @property {number} lng - Longitude coordinate.
 */

/**
 * @typedef {Object} Event
 * @property {string} id - Unique identifier for the event.
 * @property {string} title - The name of the event.
 * @property {string} description - Detailed information about the event.
 * @property {Location} location - Geographical coordinates.
 * @property {string} address - Physical address of the venue.
 * @property {string} creator - ID of the user who created the event.
 */

/** * Mock data for development purposes.
 * @type {Event[]} 
 */
const DUMMY_EVENTS = [
  {
    id: 'p1',
    title: 'Coldplay Concert',
    description: 'The best concert in the world!',
    location: { lat: 40.7484474, lng: -73.9871516 },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

/**
 * Retrieves an event by its unique ID.
 * * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @throws {HttpError} 404 - If no event is found with the provided ID.
 */
export const getEventById = (req, res, next) => {
  const eventId = req.params.eid; 
  const event = DUMMY_EVENTS.find(p => p.id === eventId);

  if (!event) {
    throw new HttpError('Could not find an event for the provided id.', 404);
  }
  res.json({ event }); 
};

/**
 * Retrieves all events created by a specific user.
 * * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
export const getEventByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const event = DUMMY_EVENTS.find(p => p.creator === userId);

  if (!event) {
    return next(new HttpError('Could not find an event for the user id.', 404));
  }
  res.json({ event });
};