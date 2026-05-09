/**
 * @file userController.js
 * @description Business logic for user management, authentication, and saved events.
 * Implements JWT-based security and password hashing.
 * @module controllers/userController
 * @author Nico Paez
 */

import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import HttpError from '../models/http-error.js';
import User from '../models/user.js';

/**
 * Registers a new user in the database.
 * 
 * @async
 * @function register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError('User exists already, please login instead.', 422));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      savedEvents: [],
    });

    await createdUser.save();

    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY || 'supersecret_dont_share',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      token: token,
    });
  } catch (err) {
    return next(new HttpError('Registering user failed, please try again later.', 500));
  }
};

/**
 * Authenticates a user and generates a session token.
 * 
 * @async
 * @function login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Could not log you in, please check your credentials.', 500));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY || 'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    token: token,
  });
};

/**
 * Retrieves all registered users excluding passwords.
 * 
 * @async
 * @function getUsers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('Fetching users failed, please try again later.', 500));
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

/**
 * Fetches the list of saved event IDs for a specific user.
 * Includes a security check to ensure the requester owns the data.
 * 
 * @async
 * @function getSavedEvents
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getSavedEvents = async (req, res, next) => {
  const userId = req.params.uid;

  if (userId !== req.userData.userId) {
    return next(new HttpError('Forbidden: You are not authorized to access these saved events.', 403));
  }

  try {
    const user = await User.findById(userId);
    if (!user) return next(new HttpError('User not found', 404));

    const savedIds = user.savedEvents.map(id => id.toString());
    res.json({ savedEvents: savedIds });
  } catch (err) {
    return next(new HttpError('Fetching saved events failed.', 500));
  }
};

/**
 * Toggles an event ID within the user's savedEvents collection.
 * Uses atomic Mongoose operations (addToSet/pull) for consistency.
 * Includes a security check to ensure the requester is the account owner.
 * 
 * @async
 * @function updateSavedEvents
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const updateSavedEvents = async (req, res, next) => {
  const userId = req.params.uid;
  const { eventId } = req.body;

  if (userId !== req.userData.userId) {
    return next(new HttpError('Forbidden: You are not authorized to modify this user data.', 403));
  }

  try {
    const user = await User.findById(userId);
    if (!user) return next(new HttpError('User not found', 404));

    const eventIdStr = eventId.toString();
    const isSaved = user.savedEvents.some(id => id.toString() === eventIdStr);

    if (isSaved) {
      user.savedEvents.pull(eventIdStr);
    } else {
      user.savedEvents.addToSet(eventIdStr);
    }

    await user.save();
    res.json({ savedEvents: user.savedEvents });
  } catch (err) {
    console.error('[UserController Error]:', err);
    return next(new HttpError('Updating saved events failed.', 500));
  }
};

export { register, login, getUsers, getSavedEvents, updateSavedEvents };