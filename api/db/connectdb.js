import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Mongo Database');
    } catch (error) {
        console.error('Error connecting to Mongo Database');
        //throw error;
    }
};