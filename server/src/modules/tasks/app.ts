import express from 'express';
import tasksRouter from './tasks.route.ts';
import cors from 'cors';
import { errorHandler } from './tasks.middleware.ts';

const PORT = '3000';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', tasksRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`The server is running on port=${PORT}`)
});