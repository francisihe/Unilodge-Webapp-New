import { verifyManagerOrAdmin } from "../middlewares/verifyManagerOrAdmin"
import router from "./property"

//Create a booking
router.route('/create')
    .post(createBooking)

//Get all bookings of a specific user
router.route('user/all')
    .get(getUserBookings)

//Get a booking by id
router.route('user/:id')
    .get(getUserBookingsById)


// Manager or Admins Below

//Get all bookings as admin or manager
router.route('/all')
    .get(verifyManagerOrAdmin, getAllBookings)

//Get a booking by id as admin or manager
router.route('/:id')
    .get(verifyManagerOrAdmin, getBooking)

//Update a booking by id as admin or manager
router.route('/:id')
    .patch(verifyManagerOrAdmin, updateBooking)

//Delete a booking by id as admin or manager
router.route('/:id')
    .delete(verifyManagerOrAdmin, deleteBooking)