import express from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js"

// configure env;
dotenv.config();
//

// connect db
connectDB();

//  rest object
const app = express();

// middleware;
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth',authRoutes);


// rest api
app.get('/',(req,res)=>{
    res.send(
        "<h1> Welcome to my website</h1>"
        
    );
})


const PORT = process.env.PORT || 8000;;

// rum listen;
app.listen(PORT, ()=>{
    console.log(`server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})