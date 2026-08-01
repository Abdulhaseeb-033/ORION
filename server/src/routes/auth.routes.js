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

const router = Router();

router.post ("/register", register );
router.post ("/login", login);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logout);
router.post("/change-password", authMiddleware, changeUserPassword);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);

export default router;