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
app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Twilio setup
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

        const whatsappMessage = `New Message from XPLORE Landing Page:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Send WhatsApp message using Twilio
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: process.env.RECIPIENT_WHATSAPP_NUMBER,
            body: whatsappMessage,
        });

        res.redirect('/?success=true');
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.redirect('/?error=true');
    }
});

// Export the Express API
export default app;
