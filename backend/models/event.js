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
  /** @type {Record<string, string>} The official name of the event in multiple languages. */
  title: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },

  /** @type {Date} The scheduled date and time for the event. */
  date: { type: Date, required: true },

  /** 
   * @type {Object} Physical location details.
   * @property {Record<string, string>} venue.name - Localized venue name.
   * @property {string} venue.city - Urban municipality geographical boundary.
   * @property {number} venue.lat - Geographic latitude.
   * @property {number} venue.lng - Geographic longitude.
   */
  venue: {
    name: { en: { type: String, required: true }, es: { type: String, required: true } },
    city: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },

  /** @type {Record<string, string>} Type of event classification in multiple languages. */
  category: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },

  /** @type {number} Unit ticket cost for commercial transaction workflows. */
  price: { type: Number, required: true, min: 0 },

  /** @type {boolean} Highlights the event in the main hero/carousel layouts. */
  isFeatured: { type: Boolean, required: true, default: false },

  /** @type {boolean} Flag for the administrative recommendation engine logic. */
  isRecommended: { type: Boolean, required: true, default: false },

  /** @type {string} URL or path to the event's cover image. */
  image: { type: String, required: true },

  /** @type {Record<string, string>} Detailed text about the event in multiple languages. */
  description: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },

  /** 
   * @type {mongoose.Schema.Types.ObjectId} Reference to the User who created the event.
   * @see {@link models/user} Relates this entity to the User collection.
   */
  creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

/**
 * Event Model.
 * Provides the interface for database operations (CRUD) on the 'events' collection.
 */
export default mongoose.model('Event', eventSchema);