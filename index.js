import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files (CSS, JS, etc.)

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "process.env.EMAIL",
            pass: "process.env.APP_PASSWORD",
        },
    });

    const mailOptions = {
        from: {
            name: "Ishan Roy",
            address: "trickster10ishan@gmail.com"
        },
        to: "ishanroy3118107@gmail.com", // list of receivers
        subject: "Sent from XPLORE website", // Subject line
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`, // plain text body
    }

    const sendMail = async (transporter, mailOptions) => { 
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    sendMail(transporter, mailOptions);
    res.send('Email sent successfully');
});
