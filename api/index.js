import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRouter from './routes/auth.js'
import propertyRouter from './routes/property.js'
import bookingRouter from './routes/booking.js'

const app = express(); // Express App
dotenv.config(); // Environment Variables

app.use((express.json())); // Body Parser
app.use(cookieParser());   // Cookie Parser
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
})); // CORS -- // Add allowed frontend domains to the array

// Test Route
app.get('/test', (req, res) => {
    res.send('Hello World');
})

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/properties', propertyRouter)
app.use('/api/v1/bookings', bookingRouter)

// Port and DB Connection
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    try {
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log('Connected to Mongo Database');
        } catch (error) {
            if (error) {
                console.log('Error connecting to Mongo Database');
                throw error;
            }
        }
        console.log(`Server running on port ${port}`);
    } catch (error) {
        if (error) throw error;
    }
});