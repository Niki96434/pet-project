import { Response, Request, NextFunction } from "express";
import { decodedAccessToken } from './auth.utils';

export const protectMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.cookies.token;
        console.log(token);
        const verifiableToken = decodedAccessToken(token);
        if (!verifiableToken) {
            return res.status(401).json({ error: 'User is not authorized' });
        }
        req.user = { id: verifiableToken.id, username: verifiableToken.username };
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' })
    }
}