import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async (req,res) => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Successfully");
        return connection;
    } catch (error) {
        console.error("MongoDB Connection Error");
    }
};
export default connectDB;