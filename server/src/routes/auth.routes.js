import { Router } from "express";
import {login, register, getCurrentUser, logout, changeUserPassword} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post ("/register", register );
router.post ("/login", login);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logout);
router.post("/change-password", authMiddleware, changeUserPassword);

export default router;