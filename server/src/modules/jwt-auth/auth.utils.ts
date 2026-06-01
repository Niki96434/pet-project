import jwt from 'jsonwebtoken';
import { secret } from './config.ts';

interface UserTokenPayload {
    id: number;
    username: string;
}

export const generateAccessToken = (id: number, username: string) => {
    const payload: UserTokenPayload = { id, username };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

export const decodedAccessToken = (token: string): UserTokenPayload | null => {
    try {
        const userData = jwt.verify(token, secret) as UserTokenPayload;
        return userData
    } catch {
        return null
    }
}
