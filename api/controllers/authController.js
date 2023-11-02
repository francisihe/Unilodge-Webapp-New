import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import errorHandler from '../middlewares/errorHandler.js';

export const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    //Check username availability
    const alreadyExistingUsername = await User.findOne({ username });
    if (alreadyExistingUsername) { return res.status(400).json('Username has been taken. Please try another') };

    //Check for existing user
    const alreadyExistingUser = await User.findOne({ email });
    if (alreadyExistingUser) { return res.status(400).json('User with email already exists. Please login') };

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        next(error);
    }
};

export const signInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) { return res.status(401).json('Invalid credentials. Please check your email and password') }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) { return res.status(401).json('Invalid credentials. Please check your email and password') }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...userDoc } = validUser._doc;

        res.status(200)
            .cookie('token', token, { httpOnly: true })
            .json(userDoc);

    } catch (error) {
        next(error);
    }
};