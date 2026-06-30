import { Response, Request, NextFunction } from "express";
import { decodedAccessToken, type UserTokenPayload } from './auth.utils';

interface AuthRequest extends Request {
    users?: UserTokenPayload;
}

export const protectMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid token or token expired' });
        }

        const actualToken = token.split(' ')[1];
        const decodedToken = decodedAccessToken(actualToken);

        if (!decodedToken) return res.status(401).json({ error: 'Invalid token' })

        req.users = { id: decodedToken.id, username: decodedToken.username };
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' })
    }
}