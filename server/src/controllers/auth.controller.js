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
    resetVerificationEmail } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async(req, res) => {
    const user = await registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User registered successfully"
        )
    );
});

export const login = asyncHandler(async (req, res) => {
    const result = await loginUser(req.body);

    return res.status(200).json(
        new ApiResponse(
            200, 
            result,
            "Login successful."
        )
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user.id).select("-password");

   return res.status(200).json(
    new ApiResponse(
        200,
        user,
        "Current user fetched successfully."
    )
   );
});

export const logout = asyncHandler(async (req, res) => {
    const result = await logoutUser();

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Logged out successfully."
        )
    );
});

export const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const result = await changePassword(
        req.user.id,
        oldPassword,
        newPassword
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Password changed successfully."
        )
    );
});

export const refreshToken = asyncHandler(async (req, res) => {
    
    const {refreshToken} = req.body;

    const result = await refreshAccessToken(refreshToken);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Access token refreshed successfully."
        )
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
    
    const result = await forgotPasswordService(req.body.email);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Password reset email sent successfully."
        )
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
    const {token, newPassword} = req.body;

    const result = await resetPasswordService(token, newPassword);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Password reset successfully."
        )
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const result = await verifyEmailService(token);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Email verified successfully."
        )
    );
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const result = await resetVerificationEmail(email);
    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Verification email sent successfully."
        )
    );
});