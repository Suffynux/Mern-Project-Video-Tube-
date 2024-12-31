import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 2000; // Set a default port if not found in .env

connectDb()
.then(() => { 
  app.listen(port , () => {
    console.log(`Server is listening at ${port}`)
  })
})
.catch((err) => {
  console.log("Connection failed");
  
})
