import express from 'express';
import { authController } from './auth.controller.ts';
import { body } from 'express-validator';

export const authRouter = express.Router();
const { register, login, refreshTokens, logout } = authController();

authRouter.post('/login', login);

authRouter.post('/register', [body('username', 'Имя пользователя не может быть пустым').notEmpty(), body('password', 'Пароль должен содержать хотя бы 6 символов').isLength({ min: 6 })], register);

authRouter.get('/refresh', refreshTokens);

authRouter.post('/logout', logout);