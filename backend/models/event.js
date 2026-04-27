/**
 * @file event.js
 * @description Mongoose schema and model definition for the Event entity.
 * Defines the data structure, validation rules, and relationships for events.
 * @module models/event
 * @author Nico Paez
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Event Schema Definition.
 * Represents a physical or virtual event with its associated metadata.
 */
const eventSchema = new Schema({
  /** @property {string} title - The official name of the event. */
  title: { type: String, required: true },

  /** @property {Date} date - The scheduled date and time for the event. */
  date: { type: Date, required: true },

  /** * @property {Object} venue - Physical location details.
   */
  venue: {
    name: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },

  /** @property {string} category - Type of event (e.g., Music, Tech, Sports). */
  category: { type: String, required: true },

  /** @property {boolean} isFeatured - Highlights the event in the main hero/carousel. */
  isFeatured: { type: Boolean, required: true, default: false },

  /** @property {boolean} isRecommended - Flag for the recommendation engine logic. */
  isRecommended: { type: Boolean, required: true, default: false },

  /** @property {string} image - URL or path to the event's cover image. */
  image: { type: String, required: true },

  /** @property {string} description - Detailed text about the event. */
  description: { type: String, required: true },

  /** * @property {mongoose.Types.ObjectId} creator - Reference to the User who created the event.
   * Relates this event to the 'User' collection.
   */
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

/**
 * Event Model.
 * Provides the interface for database operations (CRUD) on the 'events' collection.
 */
export default mongoose.model('Event', eventSchema);