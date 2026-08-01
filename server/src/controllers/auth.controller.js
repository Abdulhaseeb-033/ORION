import User from "../models/user.model.js";
import { 
    registerUser,
    loginUser,
    logoutUser, 
    changePassword, 
    refreshAccessToken, 
    forgotPasswordService, 
    resetPasswordService, 
    verifyEmailService,
    resetVerficationEmail } from "../services/auth.service.js";

export const register = async(req, res) => {
    const result = await registerUser(req.body);

    res.status(201).json(result);
};

export const login = async (req, res) => {
    const result = await loginUser(req.body);

    res.status(201).json(result);
};

export const getCurrentUser = async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({
        success: true,
        user,
    });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
   }
};

export const logout = async (req, res) => {
    try {
        const result = await logoutUser();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        });
    }
};

export const changeUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const result = await changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        const result = await refreshAccessToken(refreshToken);

        res.status(200).json(result);
    } catch (error) {
        return res.status(401).json({
            success: true,
            message:error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    
    const result = await forgotPasswordService(req.body.email);

    res.status(200).json(result);
};

export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body;

    const result = await resetPasswordService(token, newPassword);

    res.status(200).json(result);
};

export const verifyEmail = async (req, res) => {
    const { token } = req.body;

    const result = await verifyEmailService(token);

    res.status(200).json(result);
};

export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    const result = await resetVerficationEmail(email);
    res.status(200).json(result);
};