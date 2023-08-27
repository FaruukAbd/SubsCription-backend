import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import mongoose, { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoute from "./routes/auth.js";
const app=express();
dotenv.config();


const connectToMongodb=async()=>{
    try {
        await mongoose.connect(process.env.MONGOS);
        console.log("connected to mongodb")
    } catch (error) {
        throw error;
        
    }
}



  
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/auth",authRoute);


app.listen(8800,()=>{
    connectToMongodb();
    console.log("connected to backend");
})