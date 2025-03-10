import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error : ", error);
    }
};
//Used Named Export , always Use {} brackets when importing
//{} is required when importing named exports.
//The name must match exactly.
//If the file had multiple exports:
//You can import only the one you need or Both
