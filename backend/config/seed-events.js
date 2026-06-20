/**
 * @file seed-events.js
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
 * @type {Object[]}
 */
const events = [
  {
    title: {
      en: 'React Conference',
      es: "Conferencia de React"
    },
    date: new Date('2026-03-15'),
    venue: {
      name: { en: 'Konex Cultural Center', es: 'Centro Cultural Konex' },
      city: 'Buenos Aires',
      lat: -34.6063,
      lng: -58.4103
    },
    category: {
      en: 'Tech',
      es: "Tecnología"
    },
    price: 4500,
    isFeatured: true,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
    description: { en: "The premier gathering for React enthusiasts in Latin America.", es: "El principal encuentro para los entusiastas de React en Latinoamérica." },
    creator: '65f1a2b3c4d5e6f7a8b9c0d1'
  },
  {
    title: { en: 'Music Festival', es: 'Festival de música' },
    date: new Date('2026-04-02'),
    venue: {
      name: { en: 'Music Square', es: 'Plaza de la Música' },
      city: 'Córdoba',
      lat: -31.4055,
      lng: -64.1974
    },
    category: { en: "Music", es: "Musica" },
    price: 8000,
    isFeatured: false,
    isRecommended: false,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
    description: { en: 'A vibrant music festival in Cordoba, Argentina.', es: "Un vibrante festival de música en Córdoba, Argentina." },
    creator: '65f1a2b3c4d5e6f7a8b9c0d1'
  },
  {
    title: { en: 'Art Exhibition', es: 'Exposición de arte' },
    date: new Date('2026-05-10'),
    venue: {
      name: { en: 'Museum of Modern Art', es: 'Museo de Arte Moderno' },
      city: 'Mendoza',
      lat: -32.8894,
      lng: -68.8458
    },
    category: { en: 'Art', es: 'Arte' },
    price: 2500,
    isFeatured: true,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=800',
    description: { en: 'A showcase of contemporary art from around the world.', es: 'Una muestra de arte contemporáneo de todo el mundo.' },
    creator: '65f1a2b3c4d5e6f7a8b9c0d1'
  },
  {
    title: { en: 'Food Festival', es: 'Festival Gastronómico' },
    date: new Date('2026-06-20'),
    venue: {
      name: { en: 'Belgrano Station', es: 'Estación Belgrano' },
      city: 'Santa Fe',
      lat: -31.6375,
      lng: -60.6923
    },
    category: { en: 'Food', es: 'Comidas' },
    price: 3500,
    isFeatured: false,
    isRecommended: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800',
    description: { en: 'A celebration of local cuisine from around the world.', es: 'Una celebración de la gastronomía local de todo el mundo.' },
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
    console.log("✅ Database seeded successfully with localized dynamic pricing!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failure:", err.message);
    process.exit(1);
  }
};

seedDB();