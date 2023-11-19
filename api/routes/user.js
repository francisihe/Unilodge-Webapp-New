import express from 'express';
import { verifyUser } from '../middlewares/verifyUser.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';
import { deleteUser, getAllUsers, getUser, getUserById, updateUser, updateUserAsAdmin } from '../controllers/userController.js';
import { getUserByIdentifier } from '../middlewares/getUserByIdentifier.js';
const router = express.Router();

// Get and Update User 
router.route('/:userId')
    .get(verifyUser, getUser)
    .patch(verifyUser, updateUser)

// Admin Routes Below

/* For admin routes, userId can handle either the objectId or Email.
This is to enable the FE easily find users using their email address too
This is done using the getUserByIdentifier middleware
*/

// Get All Users
router.route('/get/all')
    .get(verifyAdmin, getAllUsers)

// Get User By Id
router.route('/get/:userId')
    .get(verifyAdmin, getUserByIdentifier, getUserById)

// Update User As Admin
router.route('/update/:userId')
    .patch(verifyAdmin, getUserByIdentifier, updateUserAsAdmin)

// Delete User 
router.route('/delete/:userId')
    .delete(verifyAdmin, getUserByIdentifier, deleteUser)

export default router;