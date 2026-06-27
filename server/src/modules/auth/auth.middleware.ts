import { Response, Request, NextFunction } from "express";
import { decodedAccessToken } from './auth.utils';

export const protectMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | null = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ error: 'User is not authorized' });
        }

        const decodedToken = decodedAccessToken(token);

        if (!decodedToken) {
            return res.status(401).json({ error: 'User is not authorized' });
        }

        req.body = { id: decodedToken.id, username: decodedToken.username };
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

