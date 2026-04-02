/**
 * @file db.js
 * @description Database connection configuration using Mongoose.
 * Manages the asynchronous handshake between the Express server and MongoDB Atlas.
 * @module config/db
 * @author Nico Paez
 */

import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database.
 * Uses the connection string provided in the environment variables.
 * @async
 * @function connectDB
 * @throws {Error} If the connection string is invalid or the database is unreachable.
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    // Attempting to connect using the URI from the .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`
  ✅ MongoDB connected successfully!
  📂 Host: ${conn.connection.host}
  🗄️  Database: ${conn.connection.name}
    `);
  } catch (error) {
    console.error(`
  ❌ MongoDB connection error: ${error.message}
  ⚠️  Make sure your MONGODB_URI in .env is correct and your IP is whitelisted.
    `);

    /**
     * Terminate the process with failure.
     * 1 indicates that the process exited due to an unhandled error.
     */
    process.exit(1);
  }
};