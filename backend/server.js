require("dotenv").config();
const express =require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const connectDB = require("./config/dbConnector.js");
const { logger } = require('./middlewares/logEvents.js');
const errorHandler = require('./middlewares/errorHandler.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require("./middlewares/verifyJWT.js")

const PORT = process.env.PORT || 3500;


const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true 
  }));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/api/auth",require("./routes/api/auth.js"));

app.use(verifyJWT);

app.use("/api/tasks",require("./routes/api/tasks.js"));

app.use("*",(req,res)=>{
    res.status(404).json({message:"Page not found"});
});

mongoose.connection.on("open",()=>{
    console.log("Connected to Database...");

    
    try {
        app.listen(PORT,()=>{
            console.log(`Server is listening on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;



