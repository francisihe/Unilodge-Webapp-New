import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const getUser = async (req, res, next) => {
    const { userId } = req.params;
    if (req.user.id !== userId) return res.status(403).json({ message: 'You can only view your own profile' });

    try {
        const user = await User.findById(userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};

export const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    if (req.user.id !== userId) return res.status(403).json({ message: 'You can only update your own profile' });

    if (req.body.password) {
        const updatedPassword = bcryptjs.hashSync(req.body.password, 10);
        req.body.password = updatedPassword;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }).select('-password');;
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {

        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const minLimit = parseInt(req.query.limit) || 15;
        const maxLimit = 100;
        const limit = Math.min(minLimit, maxLimit);

        // Calculate the skip value based on the page and limit
        const skip = (page - 1) * limit;

        const users = await User.find({})
            .select('-password')
            .skip(skip)
            .limit(limit);
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
};

export const getUserById = async (req, res, next) => {
    try {
        // User has already been defined in the getUserByIdentifier middleware
        const user = req.user;
        const { password, ...userDoc } = user._doc;
        res.status(200).json(userDoc);
    } catch (error) {
        next(error);
    }
};

export const updateUserAsAdmin = async (req, res, next) => {
    try {
        // User has already been defined in the getUserByIdentifier middleware
        const user = req.user;

        if (req.body.password) {
            const updatedPassword = bcryptjs.hashSync(req.body.password, 10);
            req.body.password = updatedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            user,
            req.body,
            { new: true }).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        // Logic already in getUserByIdentifier middleware
        const user = req.user;
        await User.findOneAndDelete(user)
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error)
    }
};