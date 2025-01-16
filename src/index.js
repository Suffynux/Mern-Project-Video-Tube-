import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
// import ApiResponse from "./utils/apiResponse.js";

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 2000; // Set a default port if not found in .env

connectDb()
