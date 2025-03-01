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
import videoRouter from "./routes/video.route.js"
import commentRouter from "./routes/comment.route.js"
import tweetRouter from "./routes/tweet.route.js"
import subscriptionRouter from "./routes/subscription.route.js"
import likeRouter from "./routes/like.route.js"

// route declaration   
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/videos" , videoRouter)
app.use("/api/v1/videos" , commentRouter)
app.use("/api/v1/" , tweetRouter)
app.use("/api/v1/subcription" , subscriptionRouter)
app.use("/api/v1/like" , likeRouter)
export {app}