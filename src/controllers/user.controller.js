import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const registerUser = asyncHandler(async(req , res) =>{
    // get users details from Frontend/Postman
    // Validation - Not empty
    // Check if user is already is exists : username and email 
    // Check for images , check for avatar
    // If images and avatar exists then send to cloudinary
    // Create user object - create entry in db
    // check user creation
    // return response

    const {username , email , fullName , password} = req.body;
    
    if (username === ""){
        throw new ApiError(400 , "Username is required");
    }

    if(email === ""){
        throw new ApiError(400 , "email is required")
    } 

    // validation for email
    if(email.includes("@")) {
        console.log("Email is valid");
    } else {
        throw new ApiError(400 , "Email is not valid");
        
    }

    if(fullName === ""){
        throw new ApiError(400 , "FullName is required")
    }

    if(password === ""){
        throw new ApiError(400 , "password is required")
    }
}
);

export {registerUser};