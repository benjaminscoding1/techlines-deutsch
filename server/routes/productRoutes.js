import express from 'express';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

productRoutes.route('/').get(getProducts);

export default productRoutes;
