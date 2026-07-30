import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async (userData) => {
    const { fullName, username, email, password } = userData;

    if (!fullName || !username || !email || !password) {
        throw new Error("All fields are required.");
    }
  
    const existingUser = await User.findOne({
        $or: [
        {email},
        {username}
    ]
});

if (existingUser) {
    throw new Error("User already exists.");
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
    fullName,
    username,
    email,
    password:hashedPassword
});

return {
    success: true,
    message: "User registered successfully.",
    user,
};

};

export const loginUser= async (userData) => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new Error("Email and Password are required.");
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new Error("User not found.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect) {
        throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
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
        success: true,
        message: "Login successful.",
        accessToken: token,
        refreshToken,
        user,
    };
};

export const changePassword = async (userId, oldPassword, newPassword) => {

    if(!oldPassword || !newPassword) {
        throw new Error("Old Password and New Password are required");
    }

    const user = await User.findById(userId);

    if(!user) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if(!isPasswordCorrect){
        throw new Error("Old Password is Incorrect");
    }

    if(oldPassword === newPassword) {
        throw new Error("New password most be differnt from old password");
    }

   const hashedPassword = await bcrypt.hash(newPassword, 10);

   user.password = hashedPassword;

   await user.save();

   return {
    success: true,
    message: "Password changed successfully."
   };
};

export const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken) {
        throw new Error("Refresh token is required");
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
        success: true,
        accessToken
    }
}

export const logoutUser = async () => {
    return {
        success: true,
        message: "Logged out successfully."
    };
};