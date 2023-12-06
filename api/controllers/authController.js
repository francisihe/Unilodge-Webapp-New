import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Register New User Controller
export const createUser = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    //Automatically generate Username from first and last names, add strings and numbers in lowercase
    const username = (firstname + lastname + Math.random().toString(36).substring(2, 5) + Math.floor(Math.random() * 100)).toLowerCase().replace(/\s/g, '');

    //Check username availability
    const alreadyExistingUsername = await User.findOne({ username });
    if (alreadyExistingUsername) { return res.status(400).json('Username has been taken. Please try another') };

    //Check for existing user
    const alreadyExistingUser = await User.findOne({ email });
    if (alreadyExistingUser) { return res.status(400).json('User with email already exists. Please login') };

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ firstname, lastname, username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        next(error);
    }
};

// Sign In Controller
export const signInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) { return res.status(404).json('Invalid credentials. Please check your email and password') }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) { return res.status(404).json('Invalid credentials. Please check your email and password') }

        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
        const { password: pass, ...userDoc } = validUser._doc;

        res.status(200)
            .cookie('token', token)
            .json(userDoc);

    } catch (error) {
        next(error);
    }
};

// Implement SignUp and SignIn via Google
export const google = async (req, res, next) => {
    try {
        // Check if user exists 
        const validUser = await User.findOne({ email: req.body.email });

        // If User exists, issue token and sign in
        if (validUser) {
            const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
            const { password: pass, ...userDoc } = validUser._doc;
            res.status(200)
                .cookie('token', token, { httpOnly: true })
                .json(userDoc);
        } else {
            // Generate random password and hash it
            const password = Math.random().toString(36).substring(2, 12);
            const hashedPassword = bcryptjs.hashSync(password, 10);

            // If User does not exist, create new user and issue token  
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).substring(2, 5) + Math.floor(Math.random() * 100),
                firstname: req.body.name.split(' ')[0],
                lastname: req.body.name.split(' ')[1],
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
                role: 'user',
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
            const { password: pass, ...userDoc } = newUser._doc;

            res.status(200)
                .cookie('token', token, { httpOnly: true })
                .json(userDoc);
        }
    } catch (error) {
        next(error)
    }
};

// Sign Out User Controller
export const signout = async (req, res, next) => {
    try {
        res.clearCookie('token')
            .status(200)
            .json('User has been logged out successfully');
    } catch (error) {
        next(error);
    }
};