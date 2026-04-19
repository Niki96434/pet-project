import express from 'express';
import tasksRouter from './tasks.route.ts';

const app = express();
app.use(express.json());
app.use('/', tasksRouter);
const PORT = '3000';

app.use((req, res) => {
    res.status(404).json({ error: 'Nothing found' })
});

app.listen(PORT, () => {
    console.log(`The server is running on port=${PORT}`)
});