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

};

export const getUserBookingsById = async (req, res, next) => {

};

export const getAllBookings = async (req, res, next) => {

};

export const getBooking = async (req, res, next) => {

};

export const updateBooking = async (req, res, next) => {

};

export const deleteBooking = async (req, res, next) => {

};