/**
 * @file category.js
 * @description Mongoose schema and model definition for Event Categories.
 * Provides a centralized taxonomy for classifying events (e.g., Music, Tech, Sports).
 * @module models/category
 * @author Nico Paez
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Category Schema Definition.
 * Used to populate dropdowns in the frontend and filter events by type.
 */
const categorySchema = new Schema({
  /** * @property {string} title - The unique name of the category.
   * Example: 'Music', 'Workshop', 'Networking'.
   */
  title: { 
    type: String, 
    required: true,
    unique: true // Ensures no duplicate categories are created
  }
});

/**
 * Category Model.
 * Manages the 'categories' collection in MongoDB.
 */
export default mongoose.model('Category', categorySchema);