import jwt from 'jsonwebtoken';
import errorHandler from './errorHandler.js'

export const verifyAdmin = (req, res, next) => {
    // const token = req.cookies.token;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return next(errorHandler(401, "Unauthorized. Please include a valid token."));
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) return next(errorHandler(401, 'Unauthorized. Please login to continue'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden, admins only. You do not have pemission to proceed'));

        if (user.role !== 'admin')
            return next(errorHandler(403, 'Forbidden, admins only. You do not have pemission to proceed'));

        req.user = user;
        next();
    });
};