import { type ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'DBError') {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err.name === 'isValidIdError') {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err.name === 'isValidTaskFields') {
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err.name === 'isExistTaskError') {
        return res.status(err.statusCode).json({ error: err.message });
    }

    return res.status(404).json({ error: 'Nothing found' })
}
