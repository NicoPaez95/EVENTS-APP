/**
 * @file seed.js
 * @description Database seeding script. 
 * Populates the MongoDB collection with initial event data for development environments.
 * @module seed
 * @author Nico Paez
 */

import mongoose from 'mongoose';
import Event from '../models/event.js';
import dotenv from 'dotenv';

// Initialize environment variables from configuration setup
dotenv.config();

/**
 * Initial dataset for the Events Application.
 * Every object adheres strictly to the target MongoDB Mongoose Schema rules.
 * 
 * Architectural Strategy:
 * - Resource Efficiency: Images pull optimized assets directly from Unsplash using responsive size queries (?w=800).
 * - Entity Consistency: The property 'image' aligns with database field schemas to avoid clientside transformations.
 * 
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
    creator: '65f1a2b3c4d5e6f7a8b9c0d1' // Mock ObjectId for initial local development
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
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800', // Updated URL: Live stage with crowd lighting
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
    image: 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=800', // Updated URL: Modern open gallery layout
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
 * Main transactional task execution script to wipe and seed the targeted cluster.
 * Connects via URI string, drops historical event logs, and batches the seeding routine.
 * 
 * @async
 * @function seedDB
 * @returns {Promise<void>} Resolves when the document injection finishes or logs errors.
 */
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🛠️  Database connected for seeding...");

    // Clear existing data to prevent duplicate record bloat during developer resets
    await Event.deleteMany();
    console.log("🗑️  Old events cleared.");

    // Insert new sanitized sample datasets
    await Event.insertMany(events);
    console.log("✅ Database seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failure:", err.message);
    process.exit(1);
  }
};

seedDB();