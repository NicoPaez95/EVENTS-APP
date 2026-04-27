import express from 'express';
import * as usersController from '../controllers/users-controller.js';

const router = express.Router();


router.post('/register', usersController.register); // Tu /register del front
router.post('/login', usersController.login);   // Tu /login del front

/*
router.post('/login', usersController.login);   // Tu /login del front
router.get('/', usersController.getUsers); // Para admin o debug
*/

export default router;