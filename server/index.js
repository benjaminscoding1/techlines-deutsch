import dotenv from 'dotenv';
import connectDb from './database.js';
import express from 'express';

//Our Routes
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDb();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/products', productRoutes)

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
