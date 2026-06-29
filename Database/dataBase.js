import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async (req,res) => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Successfully");
        return connection;
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        console.log(process.env.MONGODB_URL);
    }
};
export default connectDB;


// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGODB_URL);

//         console.log("MongoDB Connected Successfully");
//         console.log(`Host: ${connection.connection.host}`);

//     } catch (error) {
//         console.error("MongoDB Connection Error:", error.message);
//         process.exit(1);
//     }
// };

// export default connectDB;