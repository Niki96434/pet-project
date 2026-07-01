import { Response, Request, NextFunction } from "express";
import { decodedAccessToken } from './auth.utils.js';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid token or token expired' });
        }

        const actualToken = token.split(' ')[1];
        const decodedToken = decodedAccessToken(actualToken);

        if (!decodedToken) return res.status(401).json({ error: 'Invalid token' })

        req.user = { id: decodedToken.id, username: decodedToken.username };
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

export const checkUserData = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
    next();
}
