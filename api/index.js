import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouters from './routes/user.route.js';
import authRouters from "./routes/auth.route.js";

configDotenv()

mongoose 
.connect(process.env.url)
.then(console.log("db conn established"))
.catch((err)=>{
    console.log(err);
});

const app =express();

app.use(express.json());

app.listen(3000,()=>{
    console.log("server is running on port 3000!!!");
}); 

app.use('/api/user',userRouters);
app.use('/api/auth',authRouters);