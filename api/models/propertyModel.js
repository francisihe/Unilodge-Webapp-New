import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
    },
    address: {
        type: String
    },
    propertyType: {
        type: String,
        enum: ['house', 'land']
    },
    propertyModel: {
        type: String,
        enum: ['house', 'hostel', 'land']
    },
    propertyStatus: {
        type: String,
        enum: ['available', 'taken']
    },
    propertyCategory: {
        type: String,
        required: [true, 'Please provide a type'],
        enum: ['rent', 'sale'],
    },
    regularPrice: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    discountedPrice: {
        type: Number
    },
    images: {
        type: String,
        // required: [true, 'Please provide an image'],
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    size: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Caretaker',
    },
}, { timestamps: true }
);

const PropertyModel = mongoose.model('Property', PropertySchema);

export default PropertyModel;