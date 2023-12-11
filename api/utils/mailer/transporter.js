import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load Environment Variables
dotenv.config();

// Nodemailer Transporter SMTP Config
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});
