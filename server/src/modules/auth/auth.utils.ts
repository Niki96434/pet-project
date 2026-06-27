import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CookieType } from './types';
dotenv.config();

interface UserTokenPayload {
    id: number;
    username: string;
}

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessSecret || !refreshSecret) {
    throw new Error('secret is missing in .env file!');
}

export const generateAccessToken = (id: number, username: string) => {
    const payload: UserTokenPayload = { id, username };
    return jwt.sign(payload, accessSecret, { expiresIn: '15m' });
}


export const decodedAccessToken = (token: string): UserTokenPayload | null => {
    try {
        const userData = jwt.verify(token, accessSecret) as UserTokenPayload;
        return userData
    } catch {
        return null
    }
}

export const generateRefreshToken = (userId: number) => {
    const payload = { userId };
    return jwt.sign(payload, refreshSecret, { expiresIn: '24h' });
}

export const getCookie = () => {
    const arrCookies = document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');
        acc[name] = value;
        return acc
    }, {} as CookieType);

    return arrCookies;
}


