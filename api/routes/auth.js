import express from 'express';
import { createUser, google, signInUser, signout } from '../controllers/authController.js';

const router = express.Router();

// Routes and Controllers
router.route('/signup')
    .post(createUser);

router.route('/signin')
    .post(signInUser);

router.route('/google')
    .post(google);

router.route('/signout')
    .get(signout)

export default router;