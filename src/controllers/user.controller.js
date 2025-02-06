import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js";
// import {upload} from "../middleware/multer.middleware.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler(async(req , res) =>{
    // get users details from Frontend/Postman
    // Validation - Not empty
    // Check if user is already is exists : username and email 
    // Check for images , check for avatar
    //   If images and avatar exists then send to cloudinary
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

    // Validation for email and username
    const existedUser = User.findOne({
        $or : [{username}, {email}]
    });

    if(existedUser){
        throw new ApiError(409 , "User and Email already Existed")
    }

    // Check for images 
    const avatorLocalPath = req.files?.avator[0]?.path;
    const coverImagePath = req.files?.coverImage[0]?.path;

    if(!avatorLocalPath) {
        throw new ApiError(400 , "Avator is required");
    }

    const avator = await uploadOnCloudinary(avatorLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if(!avator) {
        throw new ApiError(400 , "Avator is required");
    }

    const user = await User.create({
        fullName,
        avator : avator.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    // checking the user is created or not 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser) {
        throw new ApiError(500 , "Something went wrong while registering a User");
    }

    return res.status(201).json(
        new ApiResponse(200 , "User registered Successfully")
    )
});

export {registerUser};