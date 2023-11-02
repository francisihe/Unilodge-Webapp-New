import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    email: {
        type: String
    },
    inspectionDate: {
        type: Date,
        required: [true, 'Please provide a date'],
    },
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', BookingSchema);
export default BookingModel;