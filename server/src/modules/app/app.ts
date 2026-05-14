import express from 'express';
import tasksRouter from '../tasks/tasks.route.ts';
import cors from 'cors';
import { errorHandler } from '../tasks/tasks.middleware.ts';
import { authRouter } from '../jwt-auth/auth.route.ts';

const PORT = '3000';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', tasksRouter);
app.use('/auth', authRouter);
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