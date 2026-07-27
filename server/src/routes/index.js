import {Router} from "express";
import { home } from "../controllers/home.controller.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get('/', home);
router.use('/auth', authRoutes);

export default router;