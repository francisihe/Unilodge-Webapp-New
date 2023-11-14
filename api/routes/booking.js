import { verifyManagerOrAdmin } from "../middlewares/verifyManagerOrAdmin"

//Create a booking
router.route('/create')
    .post(createBooking)

//Get all bookings by user id
router.route('user/:id')
    .get(getUserBooking)

// Manager or Admins Below

//Get all bookings as admin or manager
router.route('/all')
    .get(verifyManagerOrAdmin, getAllBookings)

//Get a booking by id as admin or manager
router.route('/:id')
    .get(verifyManagerOrAdmin, getBooking)

