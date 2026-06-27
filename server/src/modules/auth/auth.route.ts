import express from 'express';
import { authController } from './auth.controller.ts';
import { body } from 'express-validator';

export const authRouter = express.Router();
const { register, login, getUsers, refreshToken } = authController();

authRouter.get('/users', getUsers);

authRouter.post('/login', login);

authRouter.post('/register', [body('username', 'Имя пользователя не может быть пустым').notEmpty(), body('password', 'Пароль должен содержать хотя бы 6 символов').isLength({ min: 6 })], register);

authRouter.post('/refresh', refreshToken);

// authRouter.post('/logout');