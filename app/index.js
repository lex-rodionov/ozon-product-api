import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.APP_PORT || 8000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.get('/', async (req, res) => {
  res.send({data: 'Hello World!'});
});