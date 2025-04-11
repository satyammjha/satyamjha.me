import { Request, Response } from 'express'
import nodemailer from "nodemailer";

export const sendMessage = async (req: Request, res: Response) => {

    try {

        const { email, subject, name, message } = req.body;
        console.log("Received mailing data:", name, email, subject, message)
        if (!email || !subject || !name) {
            res.status(404).send({ message: "Fill all the details before submitting" })
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }

        })

        const mailOptions: nodemailer.SendMailOptions = {
            from: `${process.env.EMAIL_ADDRESS}`,
            to: `satyammjha0@gmail.com`,
            subject: `New Message from ${email}`,
            html: `
            <body>
            
            <p>${message}</p>

            </body>
            `
        }

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).send({ message: "Email sent successfully" })
    }
    catch (error: any) {
        res.status(404).send({ message: "Internal Server Error", error })
    }

}