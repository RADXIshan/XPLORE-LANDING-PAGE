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

        // Validate environment variables
        if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN || 
            !process.env.TWILIO_WHATSAPP_NUMBER || !process.env.RECIPIENT_WHATSAPP_NUMBER) {
            console.error('Missing required environment variables');
            return res.redirect('/?error=config');
        }

        // Twilio setup
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

        const whatsappMessage = `New Message from XPLORE Landing Page:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Log the attempt
        console.log('Attempting to send WhatsApp message with config:', {
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: process.env.RECIPIENT_WHATSAPP_NUMBER,
            messageLength: whatsappMessage.length
        });

        // Send WhatsApp message using Twilio
        const result = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: process.env.RECIPIENT_WHATSAPP_NUMBER,
            body: whatsappMessage,
        });

        console.log('Message sent successfully:', result.sid);
        res.redirect('/?success=true');
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            code: error.code,
            status: error.status,
            moreInfo: error.moreInfo
        });
        res.redirect('/?error=send');
    }
});

// Export the Express API
export default app;
