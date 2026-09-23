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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding:20px;">

            <h1 style="color: #2563eb;">Welcome to ORION 🚀</h1>

            <p>Hello <strong>${fullName}</strong>,</p>

            <p>Thank you for creating your ORION account.</p>

            <p>Please verify your email to activate your account.</p>

            <a href="${verificationUrl}"
              style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoretion: none; border-radius: 8px;
              font-weight: bold;">
                Verify Email
            </a>

            <p style="margin-top:25px;">
                If the button doesn't work, please copy and paste the following link into your browser:
            </p>

            <P>${verificationUrl}</P>

            <hr>

            <p style="color:gray; font-size: 13px;">
                This email was sent automatically by ORION AI Assistant.
            </p>
        </div>
        `,
    };
    
    await transporter.sendMail(mailOptions);

    console.log("Email sent Successfully");
};

export const sendWelcomeEmail = async (email, fullName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to ORION",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding:20px;">

            <h1 style="color: #2563eb;">Welcome to ORION 🚀</h1>

            <p>Hello <strong>${fullName}</strong>,</p>

            <p>Your email has been verified successfully.</p>

            <p>Welcome to ORION ecosystem.</p>

            <p>You can now securely access your ORION account.</p>

            <hr>

            <p style="color:gray; font-size: 13px;">
                Thankyou for joining ORION AI Assistant.
            </p>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Welcome Email sent Successfully");
};

export const sendResetPasswordEmail = async (email, fullname, resetToken) => {
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your ORION Account Password",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding:20px;">

            <h1 style="color: #2563eb;">Reset Your Password</h1>
            
            <p>Hello <strong>${fullname}</strong>,</p>

            <p>We received a request to reset your ORION account password.</p>
            
            <p>Please click the button below to create a new password:</p>
            
            <a href="${resetPasswordUrl}"
               style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoretion: none; border-radius: 8px; font-weight: bold;">
                Reset Password
            </a>
            
            <p style="margin-top:20px;">
               This link will expire in <strong>15 minutes</strong>.
            </p>

            <p>
               If you didn't request a password reset, you can safely ignore this email.
            </p>

            <hr>

            <p style="color:gray; font-size: 13px;">
               ORION AI Assistant • Security Team
            </p>
        </div>
        `,
    };
    
    await transporter.sendMail(mailOptions);

    console.log("Reset Password Email sent Successfully");
};

export const sendPasswordChangedEmail = async (email, fullName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "ORION Password Changed",
        html: `
        <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; padding:20px;">
            
            <h1 style="color:#2563eb;">Password Changed</h1>
            
            <p>Hello <strong>${fullName}</strong>,</p>
            
            <p>Your ORION account password was changed successfully.</p>
            
            <p>If you made this change, no further action is required.</p>
            
            <p style="color:#b91c1c;">
              <strong>Didn't change your password?</strong>
              <br>
              Secure your ORION account immediately.
            </p>
            
            <hr>
            
            <p style="color:gray; font-size:13px;">
              This is an automated security notification from ORION 
            </p>
        </div>
        ` 
    };

    await transporter.sendMail(mailOptions);

    console.log("Password changed email sent succussfully.");
};

export const sendPasswordResetSuccessEmail = async (email, fullName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "ORION Password Reset Successful",

        html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px">

            <h1 style="color: #2563eb;">
                Password Reset Successful 
            </h1>

            <p>Hello <strong>${fullName}</strong>,</p>

            <p>
                Your ORION account password has been reset successfully.
            </p>

            <p>
                You can now use your new password to sign in to your account.
            </p>

            <p style="color:#b91c1c;">
                <strong>Didn't reset your password?</strong><br>
                Secure your ORION account immediately.
            </p>

            <hr>

            <p style="color:gray;font-size:13px;">
                This is an automated security notification from ORION.
            </p>

        </div>
        `
    };

    await transporter.sendMail(mailOptions);

    console.log("Password reset success email sent successfully.");

};


export const sendResetVerificationEmail = async (email, fullname, verificationToken) => {
    const resetVerificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "New Verification Link - ORION",
        html: `
            <html>
                <body style="font-family; Arial, sans-serif;">

                    <h1>ORION</h1>
                    <h2>Hello ${fullname},</h2>
                    
                    <p>You requested a new email verification link.</p>
                    
                    <p>Your previous verification link may have expired.</p>

                    <p> click the button below to verify your account:</p>
                    
                    <a href="${resetVerificationUrl}"
                       style="display: inline-block; padding: 12px 20px; background: #2563eb; color: #ffffff; text-decoretion: none; border-radius: 6px;"
                    >
                    Verify email
                    </a>
                    
                    <p>This link will expire in <b>24 hours</b>.</p>
                    
                    <p>If you didn't request this email. you can safely ignore it.</p>
                    
                    <hr>
                    
                    <p>ORION Security Team</p>
                
                </body>
            </html> 
        `
    };

    await transporter.sendMail(mailOptions);

    console.log("Resend Verification Email sent successfully");
};

export const sendNewDeviceLoginEmail = async (email, fullName, deviceInfo ) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "New Device Login - ORION",

        html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 10px;">
         
          <h1 style="color: #2563eb;">
             New Device Login
          </h1>
          
          <p>Hello <strong>${fullName}</strong>,</P>
          
          <P>
             A new device gas been used to sign in to your ORION account.
          </p>
          
          <div styles="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
             <p>
               <strong>Device:</strong>${deviceInfo?.deviceName || "Unknown device"}
             </p>
             
             <p>
               <strong>Type:</strong>${deviceInfo?.deviceType || "Unknown"}
             </p>

             <p>
               <strong>Browser:</strong>${deviceInfo?.browser || "Unknown"}
             </p>

             <p>
               <strong>Operating System:</strong>${deviceInfo?.operatingSystem || "Unknown"}
             </p>

             <p>
               <strong>Time:</strong>${deviceInfo?.loginTime || new Date().toLocaleString()}
             </p>

            </div>
            
            <p>
              If this was you, you don't need to do anything.
            </p>
            
            <p style="color: #b91c1c;>
              <strong>Didn't recognize this login?</strong>
              <br>
              Secure your Orion account immediately.
            </p>
            
            <hr>
            
            <p style="color: #6b7280; font-size: 13px;">
              This is an automated security notification from ORION.
            </p>
            
        </div>`
    };

    await transporter.sendMail(mailOptions);

    console.log("New device login email sent successfully");

};

export const sendSecurityAlertEmail = async (
    email,
    fullName,
    alertMessage
) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "ORION Security Alert",

        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 10px;">

            <h1 style="color: #dc2626;">
                Security Alert 
            </h1>

            <p>Hello <strong>${fullName}</strong>,</p>

            <p>
                ORION detected a security-related event on your account.
            </p>

            <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
                <strong>Security Event:</strong>
                <p style="margin-bottom: 0;">
                    ${alertMessage}
                </p>
            </div>

            <p>
                If you performed this action, you can safely ignore this
                message.
            </p>

            <p style="color: #b91c1c;">
                <strong>
                    If you don't recognize this activity, secure your
                    ORION account immediately.
                </strong>
            </p>

            <hr>

            <p style="color: #6b7280; font-size: 13px;">
                This is an automated security notification from ORION.
            </p>

        </div>
        `
    };

    await transporter.sendMail(mailOptions);

    console.log("Security alert email sent successfully.");

};