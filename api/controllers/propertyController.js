import mongoose from 'mongoose';
import Property from '../models/propertyModel.js';

export const getAllProperties = async (req, res, next) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};

export const getProperty = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json('Invalid ID format');
        }

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json('Property does not exist');
        };

        res.status(200).json(property);

    } catch (error) {
        next(error);
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const { title, description, address, propertyType, propertyModel, propertyStatus, propertyCategory,
            regularPrice, discountedPrice, images, bedrooms, bathrooms, size } = req.body

        const newProperty = await Property.create({
            title, description, address, propertyType, propertyModel, propertyStatus, propertyCategory,
            regularPrice, discountedPrice, images, bedrooms, bathrooms, size
        });
        return res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
};

export const updateProperty = async (req, res, next) => {
    try {

    } catch {
        next(error);
    }
};

export const deleteProperty = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json('Invalid ID format');
        }

        const property = await Property.findByIdAndDelete(id);
        if (!property) { return res.json('Property does not exist') }
        res.status(200).json('Property deleted successfully');
    } catch (error) {
        next(error);
    }
};