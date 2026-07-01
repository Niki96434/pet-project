import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface UserTokenPayload {
    id: number;
    username: string;
}

export interface CookieType {
    [key: string]: string;
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

export const decodedAccessToken = (token: string): UserTokenPayload => {
    return jwt.verify(token, accessSecret) as UserTokenPayload;
}

export const decodedRefreshToken = (token: string): UserTokenPayload => {
    return jwt.verify(token, refreshSecret) as UserTokenPayload;
}

export const generateRefreshToken = (id: number, username: string) => {
    const payload = { id, username };
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

