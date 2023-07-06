import express from 'express';

import config from '../config/index.js';
import productRouter from './product/product.controller.js';

const app = express();
const { port } = config.server;

app.use(express.json());
app.use('/product', productRouter);
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});