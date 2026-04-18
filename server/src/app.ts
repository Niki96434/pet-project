import express from 'express';

const app = express();

const PORT = '3000';

app.get('/', (req, res) => {
    res.status(200).json({ data: 'hello world' })
});


app.listen(PORT, () => {
    console.log('The server is running on port=3000')
})