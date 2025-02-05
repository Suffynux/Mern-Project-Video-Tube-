// Here we store the cloudnary configuration
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const errorMessge = "Could not find the file path";
    if (!localFilePath) return errorMessge;
    // Upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded
    console.log("file has been uploaded", response.url);
  } catch (error) {
    // File is on server and for a save cleaning purpose we will unlink the file after uploaded in cloudinart
    fs.unlinkSync(localFilePath); //remove the locally saved file as the upload is failed
    console.log(error);

    return null;
  }
};

export {uploadOnCloudinary}