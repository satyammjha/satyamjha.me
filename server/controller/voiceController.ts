import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadMiddleware = upload.single('audio');

const sendVoiceNote = async (req: Request, res: Response) => {
    console.log("Received request to send voice note");
    
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No audio file received." });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: `Voice Notes App <${process.env.EMAIL_ADDRESS}>`,
            to: "satyammjha0@gmail.com",
            subject: `New voice note from ${email}`,
            text: `Hi there,\n\nYour voice note recording is attached to this email.\n\nBest regards,\nThe Voice Notes Team`, // Plain text fallback
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { text-align: center; border-bottom: 2px solid #e0e0e0; padding-bottom: 20px; }
                        .logo { max-width: 150px; height: auto; }
                        .content { padding: 30px 0; }
                        .details { background: #f8f9fa; padding: 20px; border-radius: 8px; }
                        .footer { text-align: center; color: #666; font-size: 0.9em; margin-top: 30px; }
                        .button { 
                            background-color: #007bff; 
                            color: white !important; 
                            padding: 12px 25px; 
                            border-radius: 5px; 
                            text-decoration: none;
                            display: inline-block;
                            margin-top: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://your-app.com/logo.png" alt="App Logo" class="logo">
                            <h1 style="color: #2c3e50; margin-top: 15px;">Your Voice Note</h1>
                        </div>
        
                        <div class="content">
                            <p>Hello there,</p>
                            <p>Your voice note recording has been successfully processed and is ready for download.</p>
                            
                            <div class="details">
                                <h3 style="color: #2c3e50; margin-top: 0;">📄 Recording Details</h3>
                                <ul style="list-style: none; padding-left: 0;">
                                    <li>📧 Sent from: ${email}</li>
                                    <li>📅 Date: ${new Date().toLocaleDateString()}</li>
                                    <li>⏱️ Duration: ${req.body.duration || 'N/A'}</li>
                                    <li>📦 File Size: ${(req.file.size / 1000000).toFixed(2)} MB</li>
                                </ul>
                            </div>
        
                            <p style="margin-top: 25px;">
                                <strong>🔗 Download Attachment:</strong><br>
                                The audio file is attached to this email. Look for: 
                                <code style="background: #f0f0f0; padding: 2px 5px; border-radius: 3px;">voice-note.webm</code>
                            </p>
                        </div>
        
                    
                    </div>
                </body>
                </html>
            `,
            attachments: [
                {
                    filename: "voice-note.webm",
                    content: req.file.buffer,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Voice note sent successfully!" });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Error processing your request" });
    }
};

export default sendVoiceNote;