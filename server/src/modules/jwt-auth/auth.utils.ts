import jwt from 'jsonwebtoken';

interface UserTokenPayload {
    id: number;
    username: string;
}

const secret = process.env.SECRET;

if (!secret) {
    throw new Error('secret is missing in .env file!');
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
