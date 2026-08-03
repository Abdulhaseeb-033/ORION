import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to email server:", error);
    } else {
        console.log("SMTP server is ready to send messages.");
    }
});

export const sendVerificationEmail = async (email, fullName, verificationToken) => {

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your ORION Account",
        html: `
            <h1>Welcome to ORION 🚀</h1>

            <p>Hello ${fullName},</p>

            <p>Thank you for creating your ORION account.</p>

            <p>Please verify your email to activate your account.</p>

            <p>
              <a href="${verificationUrl}">
                Verify Email
              </a>
            </p>
        `,
    };
    
    await transporter.sendMail(mailOptions);

    console.log("Email sent Successfully");
};