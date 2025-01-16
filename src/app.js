import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";   
import e from "express";

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

app.get('/', (req, res) => {
    res.send('Hello World')
  })
  

export {app}