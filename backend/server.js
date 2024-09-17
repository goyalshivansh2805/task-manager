require("dotenv").config();
const express =require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const connectDB = require("./config/dbConnector.js");
const { logger } = require('./middlewares/logEvents.js');
const errorHandler = require('./middlewares/errorHandler.js');

const PORT = process.env.PORT || 3500;


const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(logger);

app.use(express.urlencoded({extended:true}));

app.use("/api/tasks",require("./routes/api/tasks.js"));

app.use("*",(req,res)=>{
    res.status(404).json({message:"Page not found"});
});

app.use(errorHandler);

mongoose.connection.on("open",()=>{
    console.log("Connected to Database...");

    app.listen(PORT,()=>{
        console.log(`Server is listening on PORT ${PORT}`);
    });
});

export default app;



