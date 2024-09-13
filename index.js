import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Database/dataBase.js';
import userRouter from './Routers/userRouter.js';
import adminRouter from './Routers/adminRouter.js';
import authRouter from './Routers/authRouter.js';

dotenv.config();
const app = express();

//database connected
connectDB();

app.use(cors({
    origin: "*",
    credentials: true,
})
);

app.use(express.json());
app.use(cookieParser()); //middlewear

app.use("/api",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/auth",authRouter)

//Error handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.get("/",(req,res) => {res.send("Server is Working")});

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {console.log(`Server is running on port ${PORT}`)})