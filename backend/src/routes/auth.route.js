import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router()

router.post("/signup", signup );
router.post("/login", login );
router.post("/logout", logout );

export default router; // Default Export => import authRoutes from "./routes/auth.route.js"
// Can rename from authRoutes to any other name in case of default export
