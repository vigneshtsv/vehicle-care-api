import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Database/dataBase.js';
import userRouter from './Routers/userRouter.js';
import adminRouter from './Routers/adminRouter.js';
import authRouter from './Routers/authRouter.js';
import orderRouter from './Routers/orderRouter.js';
import petrolStationRouter from './Routers/petrolStationRouter.js';

dotenv.config();
const app = express();

//database connected
connectDB();

app.use(cors({
    origin: "*",
    //methods:['']           Ex: GET,POST,PUT,DELETE
    credentials: true,
})
);

app.use(express.json());
app.use(cookieParser()); //middlewear
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use("/api",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/auth",authRouter)
app.use("/api/order",orderRouter)
app.use("/api/petrolstation",petrolStationRouter)

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