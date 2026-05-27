import { type Request, type Response } from "express";
import { users } from "./users.ts";
import bcrypt from 'bcryptjs';
import { validationResult } from "express-validator";
import { type UserEntity } from './users.ts';
import jwt from 'jsonwebtoken';
import { secret } from './config.ts';

const generateAccessToken = (id: number, username: string) => {
    const payload = { id, username }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

function isUserEntity(arg: unknown): arg is UserEntity {
    return (typeof arg === 'object' && arg !== null && 'id' in arg && 'username' in arg && 'password_hash' in arg)
}

function isUserEntityArray(arg: unknown[]): arg is UserEntity[] {
    return arg.every(isUserEntity) && Array.isArray(arg)
}

export function authController() {
    const register = (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: 'Invalid registration' });
            }
            const { username, password } = req.body;
            const isExistUser = users.prepare('SELECT * FROM users WHERE username = ?').get(username);
            if (isExistUser) {
                return res.status(400).json({ error: `User with username: ${username} already exist` })
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            users.prepare('INSERT INTO users(username, password_hash) VALUES(?,?) RETURNING username').get(username, hashPassword);
            res.status(200).json({ message: 'Registration was successful' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: 'Registration error' });
        }
    }

    const login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const isExistUser = users.prepare('SELECT * FROM users WHERE username = ?').get(username) as UserEntity;
            if (!isExistUser) {
                return res.status(400).json({ error: `User with username: ${username} does not exist` });
            }
            const isValidPassword = await bcrypt.compare(password, isExistUser.password_hash);
            if (!isValidPassword) {
                return res.status(400).json({ error: 'Invalid password or login' })
            }
            const token = generateAccessToken(isExistUser.id, isExistUser.username);
            res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(401).json({ error: 'Login error' });
        }
    }

    const getUsers = async (req: Request, res: Response) => {
        try {
            const allUsers: unknown[] = users.prepare('SELECT * FROM users').all();
            if (!isUserEntityArray(allUsers)) {
                return res.status(500).json({ error: 'Invalid data' });
            }
            return res.status(200).json({ message: 'All users were successfully found', data: allUsers });
        } catch (e) {
            console.log(e);
            res.status(401).json({ error: 'Error with get users' });
        }
    }

    return { register, login, getUsers }
}
