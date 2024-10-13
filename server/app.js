import express from "express";
import hpp from 'hpp';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit"
import mongoose from "mongoose";
import cors from "cors";
import { REQUEST_SIZE, SERVER_REQUEST_LIMIT, SERVER_REQUEST_TIME, SERVER_URL, URL_ENCODED } from "./src/config/config.js";
import {route} from "./src/route/api.js";


const app = express();


// SET BODY 
app.use(express.json({ limit: REQUEST_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));

// APPLY SECURITY 
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(cors());

// SET REQUEST TIME AND LIMIT 
const setLimit = rateLimit({
    windowMs: SERVER_REQUEST_TIME,
    limit: SERVER_REQUEST_LIMIT,
})
app.use(setLimit);


// SET DATABASE CONNECTION  

mongoose.connect(SERVER_URL, { autoIndex: true })
    .then(() => console.log("DATABASE CONNECTION SUCCESSFULLY"))
    .catch((e) => console.log(`FAILED TO CONNECT DATABASE ${e.message}`))

// HANDLE API URL 
app.use("/api/v1",route);



// HANDLE CLIENT SIDE ERROR  
app.use((req, res, next) => {
    next(createHttpError(404, "PAGE NOT FOUND"))
})



// HANDLE SERVER ERROR 

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: "INTERNAL SERVER ERROR",
        error: error.message
    })
})

export default app ; 