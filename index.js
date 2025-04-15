import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import twilio from 'twilio';

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
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Twilio setup
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    const whatsappMessage = `New Message from XPLORE Landing Page:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    console.log('Attempting to send WhatsApp message...');
    console.log('From:', process.env.TWILIO_WHATSAPP_NUMBER);
    console.log('To:', process.env.RECIPIENT_WHATSAPP_NUMBER);

    // Send WhatsApp message using Twilio
    client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: process.env.RECIPIENT_WHATSAPP_NUMBER,
        body: whatsappMessage,
    })
    .then((message) => {
        console.log('WhatsApp message sent successfully:', message.sid);
        res.redirect('/');
    })
    .catch((error) => {
        console.error('Error sending WhatsApp message:', error);
        res.send('Error occurred. Message not sent.');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
