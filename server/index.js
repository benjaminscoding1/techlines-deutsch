import dotenv from 'dotenv';
import connectDb from './database.js';
import express from 'express';

//Our Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDb();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
