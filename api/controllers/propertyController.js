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
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json('Invalid ID format');
    }

    try {
        const property = await Property.findById(propertyId);
        if (!property) { return res.status(404).json('Property does not exist') };
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const newProperty = await Property.create(req.body);
        return res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
};

export const updateProperty = async (req, res, next) => {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json('Invalid ID format');
    }

    const property = await Property.findById(propertyId);   //Check if property exists
    if (!property) { return res.json('Property does not exist') };

    try {
        const updateProperty = await Property.findByIdAndUpdate(
            propertyId,
            req.body,
            { new: true } // Returns the updated property
        );
        res.status(200).json(updateProperty);
    } catch {
        next(error);
    }
};

export const deleteProperty = async (req, res, next) => {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
        return res.status(400).json('Invalid ID format');
    }
    try {
        const property = await Property.findByIdAndDelete(propertyId);
        if (!property) { return res.json('Property does not exist') }
        res.status(200).json('Property deleted successfully');
    } catch (error) {
        next(error);
    }
};