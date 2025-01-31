import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { ApiResponse } from "./utils/apiResponse.js";

// import ApiResponse from "./utils/apiResponse.js";

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 2000; // Set a default port if not found in .env
console.log(port)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDb()
.then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((error)=>{
  console.log("Mongo DB Connection Fail:" , error)
})

