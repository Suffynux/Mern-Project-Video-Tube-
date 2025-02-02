import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req , res) =>{
    // get users details from Frontend/Postman
    // Validation - Not empty
    // Check if user is already is exists : username and email 
    // Check for images , check for avatar
    // If images and avatar exists then send to cloudinary
    // Create user object - create entry in db
    // check user creation
    // return response

    const {username , email , fullName} = req.body;
    console.log(username , email , fullName) 

}
)

export {registerUser};