/**
 * @file events-controller.js
 * @description Controller logic for event-related operations. 
 * Manages database interactions using Mongoose for retrieving, 
 * filtering, and displaying event data.
 * @module controllers/events
 * @author Nico Paez
 */

import HttpError from '../models/http-error.js';
import Event from '../models/event.js';

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

/**
 * Retrieves all events stored in the database.
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
 const getAllEvents = async (req, res, next) => {
  let events;
  try {
    events = await Event.find({});
  } catch (err) {
    return next(
      new HttpError('Fetching events failed, please try again later.', 500)
    );
  }
  
  // Transform Mongoose documents to plain objects and include virtual 'id' getter
  res.json({ 
    events: events.map(e => e.toObject({ getters: true })) 
  });
};

/**
 * Retrieves a specific event by its unique database ID.
 * @async
 * @param {import('express').Request} req - Express request object containing 'eid' param.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
 const getEventById = async (req, res, next) => {
  const eventId = req.params.eid; 
  let event;

  try {
    event = await Event.findById(eventId);
  } catch (err) {
    // Database connection or query syntax error
    return next(
      new HttpError('Something went wrong, could not retrieve event data.', 500)
    );
  }

  if (!event) {
    return next(
      new HttpError('Could not find an event for the provided ID.', 404)
    );
  }

  res.json({ event: event.toObject({ getters: true }) });
};

/**
 * Retrieves all events created by a specific user.
 * @async
 * @param {import('express').Request} req - Express request object containing 'uid' param.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
 const getEventByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userEvents;

  try {
    userEvents = await Event.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError('Fetching user events failed, please try again later.', 500)
    );
  }

  if (!userEvents || userEvents.length === 0) {
    return next(
      new HttpError('Could not find any events for the provided user ID.', 404)
    );
  }

  res.json({ 
    events: userEvents.map(event => event.toObject({ getters: true })) 
  });
};

export { getAllEvents, getEventById, getEventByUserId };