import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 2000; // Set a default port if not found in .env

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
