import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";



const app = express();

dotenv.config();
const PORT = process.env.PORT ;

app.use(express.json()); //Parses incoming JSON data in req.body.  Allows Express to understand JSON requests from the client.

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("server is running on PORT: " + PORT);
    connectDB();
});