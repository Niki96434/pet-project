import { type Request, type Response } from "express";
import { users } from "./users.ts";
import bcrypt from 'bcryptjs';
import { validationResult } from "express-validator";
import { type UserType } from './users.ts';
import jwt from 'jsonwebtoken';
import { secret } from './config.ts'

const generateAccessToken = (id: number, username: string) => {
    const payload = { id, username }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

export function authController() {
    const register = (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error' })
            }

            const { username, password } = req.body;
            const isExistUser = users.prepare('SELECT * FROM users WHERE username = ?').get(username);
            if (isExistUser) {
                return res.status(400).json({ message: `User with username: ${username} already exist` })
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            users.prepare('INSERT INTO users(username, password_hash) VALUES(?,?) RETURNING username').get(username, hashPassword);
            res.json({ message: 'Registration was successful' })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    const login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const isExistUser = users.prepare('SELECT * FROM users WHERE username = ?').get(username) as UserType;
            if (!isExistUser) {
                return res.status(400).json({ message: `User with username: ${username} does not exist` });
            }
            const isValidPassword = await bcrypt.compare(password, isExistUser.password_hash);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Неверный логин или пароль' })
            }
            const token = generateAccessToken(isExistUser.id, isExistUser.username);
            return res.json({ token });

        } catch (e) {
            console.log(e);
            res.status(401).json({ message: 'Login error' });
        }
    }

    const getUsers = async (req: Request, res: Response) => {
        try {

        } catch (e) {
            console.log(e);
            res.status(401).json({ message: 'Error get users' });
        }
    }

    return { register, login, getUsers }
}