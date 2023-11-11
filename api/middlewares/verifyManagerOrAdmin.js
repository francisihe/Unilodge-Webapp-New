import jwt from 'jsonwebtoken';
import errorHandler from './errorHandler.js'

export const verifyManagerOrAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next(errorHandler(401, 'Unauthorized. Please login to continue'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden. You do not have permission to proceed'));

        if (user.role !== 'manager' && user.role !== 'admin') 
        return next(errorHandler(403, 'Forbidden. You do not have permission to proceed'));

        req.user = user;
        next();
    });
};