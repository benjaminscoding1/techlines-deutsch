import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401).send('Not authorized, token failed.');
      throw new Error('Not authorized, token failed.');
    }
  }

  if (!token) {
    res.status(401).send('Not authorized, no token');
    throw new Error('Not authorized, no token.');
  }
});

export { protectRoute };
