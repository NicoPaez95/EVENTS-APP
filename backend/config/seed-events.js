/**
 * @file seed.js
 * @description Database seeding script. 
 * Populates the MongoDB collection with initial event data for development.
 * @module seed
 * @author Nico Paez
 */

import mongoose from 'mongoose';
import Event from '../models/event.js';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

/**
 * Initial dataset for the Events App.
 * Note: These objects match the Event Mongoose Schema exactly.
 * @type {Array<Object>}
 */
const events = [
  {
    title: 'React Conference',
    date: new Date('2026-03-15'),
    venue: {
      name: 'Centro Cultural Konex',
      city: 'Buenos Aires',
      lat: -34.6063,
      lng: -58.4103
    },
    category: 'Tech',
    isFeatured: true,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
    description: 'The premier gathering for React enthusiasts in Latin America.',
    creator: '65f1a2b3c4d5e6f7a8b9c0d1' // Mock ObjectId for initial development
  },
  {
    title: 'Music Festival',
    date: new Date('2026-04-02'),
    venue: {
      name: 'Plaza de la Música',
      city: 'Córdoba',
      lat: -31.4055,
      lng: -64.1974
    },
    category: 'Music',
    isFeatured: false,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800',
    description: 'A vibrant music festival in Cordoba, Argentina.',
    creator: '65f1a2b3c4d5e6f7a8b9c0d1'
  },
  {
    title: 'Art Exhibition',
    date: new Date('2026-05-10'),
    venue: {
      name: 'Museo de Arte Moderno',
      city: 'Mendoza',
      lat: -32.8894,
      lng: -68.8458
    },
    category: 'Art',
    isFeatured: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1460666819451-7410f58939b0?q=80&w=800',
    description: 'A showcase of contemporary art from around the world.',
    creator: '65f1a2b3c4d5e6f7a8b9c0d1'
  },
  {
    title: 'Food Festival',
    date: new Date('2026-06-20'),
    venue: {
      name: 'Estación Belgrano',
      city: 'Santa Fe',
      lat: -31.6375,
      lng: -60.6923
    },
    category: 'Food',
    isFeatured: false,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800',
    description: 'A celebration of local cuisine from around the world.',
    creator: '65f1a2b3c4d5e6f7a8b9c0d1'
  }
];

/**
 * Main function to wipe and seed the database.
 * @async
 * @function seedDB
 */
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🛠️  Database connected for seeding...");

    // Clear existing data to avoid duplicates during development
    await Event.deleteMany();
    console.log("🗑️  Old events cleared.");

    // Insert new sample data
    await Event.insertMany(events);
    console.log("✅ Database seeded with success!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDB();