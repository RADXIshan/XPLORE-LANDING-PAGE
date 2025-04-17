import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

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

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
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

    const sender ={
        from: {
            name: "XPLORE XIM",
            address: "ishanroy3118107@gmail.com"
        },
        to: req.body.email, // list of receivers
        subject: "XPLORE feedback", // Subject line
        text: `Thank you for your feedback. We will get back to you soon.`, // plain text body
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
    sendMail(transporter, sender);
    res.redirect('index.html#contact');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// Export the Express API
export default app;
