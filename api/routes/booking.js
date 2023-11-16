import express from 'express';
import {
    createBooking, getUserBookings, getUserBookingsById,
    getAllBookings, getBooking, updateBooking, deleteBooking
} from '../controllers/bookingController.js';
import { verifyManagerOrAdmin } from "../middlewares/verifyManagerOrAdmin.js"
import { verifyUser } from '../middlewares/verifyUser.js';
const router = express.Router();

//Create a booking
router.route('/create')
    .post(createBooking)

//Get all bookings of a specific user
router.route('/all/users/:userId')
    .get(verifyUser, getUserBookings)

//Get a user booking by booking id
router.route('/:bookingId/users/:userId')
    .get(verifyUser, getUserBookingsById)


// Manager or Admins Below

//Get all bookings as admin or manager
router.route('/all')
    .get(verifyManagerOrAdmin, getAllBookings)

//Get a booking by booking id as admin or manager
router.route('/:bookingId')
    .get(verifyManagerOrAdmin, getBooking)

//Update a booking by booking id as admin or manager
router.route('/:bookingId')
    .patch(verifyManagerOrAdmin, updateBooking)

//Delete a booking by booking id as admin or manager
router.route('/:bookingId')
    .delete(verifyManagerOrAdmin, deleteBooking)

export default router;