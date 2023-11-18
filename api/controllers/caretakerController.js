import Caretaker from '../models/caretakerModel.js'
import User from '../models/userModel.js'

export const getAllCaretakers = async (req, res, next) => {
    try {
        const caretakers = await Caretaker.find();
        res.status(200).json(caretakers);
    } catch (error) {
        next(error)
    }
};

export const getCaretaker = async (req, res, next) => {
    try {
        const caretaker = req.caretaker
        res.status(200).json(caretaker)
    } catch (error) {
        next(error)
    }
};

export const createCaretaker = async (req, res, next) => {

    try {
        //Check if a user exists with the email provided
        let user = await User.findOne({ email: req.body.email });
        let caretakerData = {...req.body}
        //If user exists, it links the caretaker to the user, else it just creates new one as usual
        if (user) {caretakerData.userRef = user._id}
        const newCaretaker = await Caretaker.create(caretakerData);
        res.status(200).json(newCaretaker);
    } catch (error) {
        next(error)
    }
};

export const updateCaretaker = async (req, res, next) => {
    const caretaker = req.caretaker;
    try {
        const updatedCaretaker = Caretaker.findByIdAndUpdate(
            caretaker,
            req.body,
            { new: true }
        )
        res.status(200).json(updatedCaretaker);
    } catch (error) {
        next(error)
    }
};

export const deleteCaretaker = async (req, res, next) => {
    try {
        const caretaker = req.caretaker;
        await Caretaker.findByIdAndDelete(caretaker);
        res.status(200).json('Caretaker has been deleted')
    } catch (error) {
        next(error)
    }
};