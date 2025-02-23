import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";   

// Middleware
app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))  
// Middle for accepting Json Data
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
  
// Routes Import 
import userRouter from "./routes/user.routes.js";

// route declaration   
app.use("/api/v1/users" , userRouter)

export {app}