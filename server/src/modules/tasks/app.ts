import express from 'express';
import tasksRouter from './tasks.route.ts';
import cors from 'cors';

const PORT = '3000';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', tasksRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Nothing found' });
});

app.listen(PORT, () => {
    console.log(`The server is running on port=${PORT}`)
});