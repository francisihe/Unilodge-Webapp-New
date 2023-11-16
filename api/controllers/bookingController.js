import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res, next) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
};

export const getUserBookings = async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user.id) return res.status(403).json('Forbidden. You can only view your own bookings');

    try {
        const userBookings = await Booking.find({ userRef: userId });
        res.status(200).json(userBookings);
    } catch (error) {
        next(error)
    }
};

export const getUserBookingsById = async (req, res, next) => {
    const { bookingId } = req.params;
    const { userId } = req.params;
    if (userId !== req.user.id) return res.status(403).json('Forbidden. You can only view your own bookings');

    try {
        const userBooking = await Booking.find({ _id: bookingId });
        // Booking returns an empty array when not found since it is a find method
        // and a booking is passed, which is truthy, hence the if statement equating to 0 indicating an empty array
        if (userBooking.length === 0) return res.status(404).json('Booking not found');
        res.status(200).json(userBooking);
    } catch (error) {
        next(error)
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        next(error)
    }
};

export const getBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status;
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};

export const updateBooking = async (req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json('Booking not found');

    try {
        const updateBooking = await Booking.findByIdAndUpdate(
            booking,
            req.body,
            { new: true }
        );
        res.status(200).json(updateBooking);
    } catch (error) {
        next(error)
    }
};

export const deleteBooking = async (req, res, next) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) return res.status(404).json('Booking not found');
        res.status(200).json("Booking has been deleted");
    } catch (error) {
        next(error)
    }
};