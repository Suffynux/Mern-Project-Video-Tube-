import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: 'drwentg4o',
  api_key: '623246271718811',
  api_secret: '6JxPkNfNiiX6tVMU7WyOwS_3wiU',
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Return the entire Cloudinary response object
    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    // Remove the file only if it exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};


export { uploadOnCloudinary };
