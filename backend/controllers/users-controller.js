import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import HttpError from '../models/http-error.js';
import User from '../models/user.js';

const register = async (req, res, next) => {
  // 1. Validar inputs (Express Validator)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { name, email, password } = req.body;

  try {
    // 2. Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError('User exists already, please login instead.', 422));
    }

    // 3. Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Crear instancia del usuario
    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      savedEvents: [], // Consistente con tu modelo de eventos
    });

    // 5. Guardar en MongoDB
    await createdUser.save();

    // 6. Generar JWT
    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY || 'supersecret_dont_share', // Fallback por si olvidas el .env
      { expiresIn: '1h' }
    );

    // 7. Respuesta exitosa
    res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      token: token,
    });

  } catch (err) {
    // Manejo de errores catastróficos
    return next(new HttpError('Registering user failed, please try again later.', 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  // 1. Buscar al usuario por email
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  // 2. Si no existe el usuario, lanzamos error
  if (!existingUser) {
    // Tip: Usamos el mismo mensaje para errores de usuario o clave por seguridad
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  // 3. Comparar la "fruta" que entra con el "licuado" (Hash) de la DB
  let isValidPassword = false;
  try {
    // Bcrypt hace la magia de comparar sin desencriptar
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Could not log you in, please check your credentials.', 500));
  }

  // 4. Si la clave no coincide
  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  // 5. Generar el Token (¡MUY IMPORTANTE!)
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY || 'supersecret_dont_share', // Usa la MISMA clave que en register
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  // 6. Respuesta al Front
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    token: token
  });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

export { register, login ,getUsers};

