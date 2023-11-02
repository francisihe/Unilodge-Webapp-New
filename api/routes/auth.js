import express from 'express';
import { createUser, signInUser } from '../controllers/authController.js';

const router = express.Router();

// Routes and Controllers
router.route('/signup')
    .post(createUser);

router.route('/signin')
    .post(signInUser);

export default router;