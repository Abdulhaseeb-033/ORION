import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetVerificationEmail, sendPasswordChangedEmail, sendPasswordResetSuccessEmail } from "./mail.service.js";

export const registerUser = async (userData) => {
    const { fullName, username, email, password } = userData;

    if (!fullName || !username || !email || !password) {
        throw new ApiError(400, "All fields are required.")
    }
  
    const existingUser = await User.findOne({
        $or: [
        {email},
        {username}
    ]
});

if (existingUser) {
    throw new ApiError(409, "User already exists.");
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
    fullName,
    username,
    email,
    password:hashedPassword
});

const verificationToken = jwt.sign(
    {
        id: user._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "24h",
    }
);    

await sendVerificationEmail(user.email, user.fullName, verificationToken);

return {
   user: {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    isEmailVerified: user.isEmailVerified
   }
};

};

export const loginUser= async (userData) => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new ApiError(400, "Email and Password are required.");
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );

    const refreshToken = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "30d",
        }
    )

    return {
        token,
        refreshToken,
        user: {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        }
    };
};

export const changePassword = async (userId, oldPassword, newPassword) => {

    if(!oldPassword || !newPassword) {
        throw new ApiError(400, "Old Password and New Password are required.");
    }

    const user = await User.findById(userId);

    if(!user) {
        throw new ApiError(404, "User not found.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if(!isPasswordCorrect){
        throw new ApiError(401, "Old Password is Incorrect.");
    }

    if(oldPassword === newPassword) {
        throw new ApiError(400, "New password must be different from old password.");
    }

   const hashedPassword = await bcrypt.hash(newPassword, 10);

   user.password = hashedPassword;

   await user.save();

   await sendPasswordChangedEmail(user.email, user.fullName)

   return {
    message: "Password changed successfully."
   };
};

export const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken) {
        throw new ApiError(400, "Refresh token is required");
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );

    const accessToken = jwt.sign(
        {
            id:decoded.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    return {
        accessToken
    };
};

export const logoutUser = async () => {
    return {};
};

export const forgotPasswordService = async (email) => {
    if(!email) {
        throw new ApiError(400, "Email is required.");
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new ApiError(404, "User not found.")
    }

    const resetToken = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"15m"
        }
    );

    await sendResetPasswordEmail(user.email, user.fullName, resetToken);

    return {};
};

export const resetPasswordService = async (token, newPassword) => {
    if(!token || !newPassword) {
        throw new Error("Token and New Password are required");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if(!user) {
        throw new Error("User not found");
        
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    await sendPasswordResetSuccessEmail(user.email, user.fullName);

    return {
        success: true,
        message: "Password reset successfully."
    };
};

export const verifyEmailService = async (token) => {
    if(!token){
        throw new Error("Verification token is required");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if(!user) {
        throw new Error("User not found");
    }

    user.isEmailVerified = true;

    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    return {
        success: true,
        message: "Email verified successfully."
    };
};

export const resetVerficationEmail = async (email) => {
    if(!email) {
        throw new Error("Email is required.");
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new Error("User not found.")
    }

    if(user.isEmailVerified) {
        throw new Error("Email is already verified.");
    }

    const verificationToken = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );

    await sendResetVerificationEmail(user.email, user.fullName, verificationToken);

    return {
        success: true,
        message: "Verification email sent successfully."
    };
};