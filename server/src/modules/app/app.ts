import express from 'express';
import tasksRouter from '../tasks/tasks.route.ts';
import cors from 'cors';
import { errorHandler } from '../tasks/tasks.middleware.ts';
import { authRouter } from '../auth/auth.route.ts';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser());

// поменять на /api/auth
app.use('/auth', authRouter);
// поменять на /api/tasks
app.use('/home', tasksRouter);
app.use(errorHandler);

const start = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`The server is running on port=${process.env.PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start();