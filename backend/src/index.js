import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors({  // Move CORS middleware before routes
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "50mb" })); // Allow JSON payload up to 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Allows Express to parse JSON in requests
app.use(cookieParser());   // Parses cookies for authentication

// Define routes after middleware
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log("server is running on PORT: " + PORT);
    connectDB();
});
