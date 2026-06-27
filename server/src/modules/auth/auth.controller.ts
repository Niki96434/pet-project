import { NextFunction, type Request, type Response } from "express";
import { db } from "./../app/db.ts";
import bcrypt from 'bcryptjs';
import { validationResult } from "express-validator";
import { type UserEntity } from './types.ts';
import { generateAccessToken, generateRefreshToken, getCookie } from "./auth.utils.ts";

function isUserEntity(arg: unknown): arg is UserEntity {
    return (typeof arg === 'object' && arg !== null && 'id' in arg && 'username' in arg && 'password_hash' in arg)
}

function isUserEntityArray(arg: unknown[]): arg is UserEntity[] {
    return arg.every(isUserEntity) && Array.isArray(arg)
}

export const authController = () => {
    const register = (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(401).json({ error: 'Invalid registration' });
            }

            const { username, password } = req.body;
            const isExistUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

            if (isExistUser) {
                return res.status(401).json({ error: `User with username: ${username} already exist` })
            }

            const hashPassword = bcrypt.hashSync(password, 10);

            db.prepare('INSERT INTO users(username, password_hash) VALUES(?,?)').run(username, hashPassword);

            res.status(200).json({ message: 'Registration was successful' });
        } catch (e) {
            res.status(401).json({ error: 'Registration error' });
        }
    }

    const login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as UserEntity;

            if (!user) {
                return res.status(401).json({ error: `User with username: ${username} does not exist` });
            }

            const isValidPassword = await bcrypt.compare(password, user.password_hash);

            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid password or login' })
            }

            const accessToken = generateAccessToken(user.id, user.username);
            const refreshToken = generateRefreshToken(user.id);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24,
            });

            db.prepare('UPDATE users SET refresh_token = ? WHERE id = ?').run(refreshToken, user.id);

            res.status(200).json({ id: user.id, name: user.username, accessToken });
        } catch (e) {
            res.status(401).json({ error: 'Login error' });
        }
    }

    const getUsers = async (req: Request, res: Response) => {
        try {
            const allUsers: unknown[] = db.prepare('SELECT * FROM users').all();
            if (!isUserEntityArray(allUsers)) {
                return res.status(500).json({ error: 'Invalid data' });
            }
            return res.status(200).json({ message: 'All users were successfully found', data: allUsers });
        } catch (e) {
            res.status(401).json({ error: 'Error with get users' });
        }
    }

    const refreshToken = async (req: Request, res: Response) => {
        const tokenFromCookie = getCookie().refreshToken;
        if (!tokenFromCookie) return res.status(401).json('Empty cookie with key=refreshToken');

        const { id, username } = req.body;

        const tokenFromDB = db.prepare(`SELECT refresh_token from users WHERE id = ?`).get(id);
        if (!tokenFromDB) return res.status(401).json('Empty refresh_token in DB');

        if (tokenFromDB !== tokenFromCookie) return res.status(401).json('The tokens do not match');

        const accessToken = generateAccessToken(id, username);
        const refreshToken = generateRefreshToken(id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        });

        db.prepare('UPDATE users SET refresh_token = ? WHERE id = ?').run(refreshToken, id);
        res.status(200).json({ accessToken });
    }

    const logout = async (req: Request, res: Response) => {
        res.status(200).json('Successful exit');
    }

    return { register, login, getUsers, refreshToken }
}
