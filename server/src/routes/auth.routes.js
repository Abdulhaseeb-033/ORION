import { Router } from "express";
import {
    login, 
    register, 
    getCurrentUser, 
    logout, 
    changeUserPassword, 
    refreshToken, 
    forgotPassword, 
    resetPassword,
    verifyEmail,
    resendVerificationEmail} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validate } from "../middleware/validationMiddleware.js";
import { registerSchema } from "../validations/Auth/register.schema.js";

const router = Router();

router.post ("/register", validate(registerSchema), register );
router.post ("/login", login);
router.get("/me", authMiddleware, asyncHandler(getCurrentUser));
router.post("/logout", authMiddleware, logout);
router.post("/change-password", authMiddleware, changeUserPassword);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);

export default router;