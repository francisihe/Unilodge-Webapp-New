import jwt from 'jsonwebtoken';
import errorHandler from './errorHandler.js'

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return next(errorHandler(401, 'Unauthorized. Please login to continue'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden. You do not have pemission to view this page'));

    req.user = user;
    next();
  });
};
