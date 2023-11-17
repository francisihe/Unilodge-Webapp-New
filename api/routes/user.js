import express from 'express';
import { verifyUser } from '../middlewares/verifyUser.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';
import { deleteUser, getAllUsers, getUserById, updateUser, updateUserAsAdmin } from '../controllers/userController.js';
const router = express.Router();

// Update User
router.route('/:userId')
    .patch(verifyUser, updateUser)

// Admin Routes Below

// Get All Users
router.route('/all')
    .get(verifyAdmin, getAllUsers)

// Get User By Id
router.route('/:userId')
    .get(verifyAdmin, getUserById)

// Update User As Admin
router.route('/:userId/update')
    .patch(verifyAdmin, updateUserAsAdmin)

// Delete User 
router.route('/:userId')
    .delete(verifyAdmin, deleteUser)

export default router;