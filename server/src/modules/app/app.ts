import express from 'express';
import { app } from './server.js';
import tasksRouter from '../tasks/tasks.route.js';
import cors from 'cors';
import { errorHandler } from '../tasks/tasks.middleware.js';
import { authRouter } from '../auth/auth.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

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