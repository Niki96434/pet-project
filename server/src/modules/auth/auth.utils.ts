import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface UserAccessTokenPayload {
    id: number;
    username: string;
}

export interface UserRefreshTokenPayload {
    id: number;
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
    const payload: UserAccessTokenPayload = { id, username };
    return jwt.sign(payload, accessSecret, { expiresIn: '15m' });
}


export const decodedAccessToken = (token: string): UserAccessTokenPayload => {
    return jwt.verify(token, accessSecret) as UserAccessTokenPayload;
}

export const decodedRefreshToken = (token: string): UserRefreshTokenPayload => {
    return jwt.verify(token, refreshSecret) as UserRefreshTokenPayload;
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

