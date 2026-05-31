import express from 'express';
import tasksRouter from '../tasks/tasks.route.ts';
import cors from 'cors';
import { errorHandler } from '../tasks/tasks.middleware.ts';
import { authRouter } from '../jwt-auth/auth.route.ts';
import cookieParser from 'cookie-parser';

const PORT = '5000';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/home', tasksRouter);
app.use(errorHandler);

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The server is running on port=${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start();