import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
// import {upload} from "../middleware/multer.middleware.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get users details from Frontend/Postman
  // Validation - Not empty
  // Check if user is already is exists : username and email
  // Check for images , check for avatar
  //   If images and avatar exists then send to cloudinary
  // Create user object - create entry in db
  // check user creation
  // return response

  const { username, email, fullName, password } = req.body;

  if (username === "") {
    throw new ApiError(400, "Username is required");
  }

  if (email === "") {
    throw new ApiError(400, "email is required");
  }

  // validation for email
  if (email.includes("@")) {
    console.log("Email is valid");
  } else {
    throw new ApiError(400, "Email is not valid");
  }

  if (fullName === "") {
    throw new ApiError(400, "FullName is required");
  }

  if (password === "") {
    throw new ApiError(400, "password is required");
  }

  // Validation for email and username
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  // Getting the image local path from req.files
  const avatorLocalPath = req.files?.avatar[0]?.path;
  let coverImagePath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImagePath = req.files.coverImage[0].path;
    console.log("worked");
  }

  if (!avatorLocalPath) {
    throw new ApiError(400, "Avator is required");
  }

  // Uploading the image to cloudinary
  const avatar = await uploadOnCloudinary(avatorLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);

  //If avator is not uploaded then throw an error
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  //Creating the user in the database
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // checking the user is created or not
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully"));
});
// Logging the user in
//getting input from user
//check if the user is existed or not
// check for password correct or not
// generate refresh token
// generate access token
// send cookies
// response

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  if (!email && !username) {
    throw new ApiError(400, "Email or username is required");
  }

  // If we get here, we have either email or username or both
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    new ApiError(404, "Invalid Credetionals");
  }
  // getting the access and refresh token from the method
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // cookies option
  const cookiesOption = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOption)
    .cookie("refreshToken", refreshToken, cookiesOption)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully",
      ),
    );
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const cookiesOption = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", cookiesOption)
    .clearCookie("refreshToken", cookiesOption)
    .json(new ApiResponse(200, {}, "User logged out Successfully"));
});

// Api endpoint for refreshing the accesss token
//getting the refrsh token from cookies
// chech if refresh token is valid or not
// if valid then generate new refresh token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  console.log(incomingRefreshToken);

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  const verifedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_KEY,
  );
  const userId = verifedToken._id;
  console.log(userId);

  const user = await User.findById(userId);
  console.log(user);

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  // matching the incoming token with user refresh token stored in database
  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "refresh token is expired");
  }

  const cookiesOption = {
    httpOnly: true,
    secure: true,
  };
  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOption)
    .cookie("newrefreshToken", newRefreshToken, cookiesOption)
    .json(
      new ApiResponse(
        200,
        { accessToken, newRefreshToken },
        "refresh token generated successfully",
      ),
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  // getting password fields from req.body
  // comparing the new password and confirm password
  // compaing the oldpassword with the userpassword
  // updating the password in database and saving the password
  // return response

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!(newPassword === confirmPassword)) {
    return new ApiError(401, "Incorrect password, please try again");
  }
  const userId = req.user._id;
  const user = await User.findById(userId);
  const correctPassword = await user.isPasswordCorrect(oldPassword);

  if (!correctPassword) {
    throw new ApiError(
      401,
      "old password is not correct, please enter correct password",
    );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Successfully changed "));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched Successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, username, email } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const userData = await User.findByIdAndUpdate(
    user,
    {
      $set: {
        fullName: fullName,
        username: username,
        email: email,
      },
    },
    { new: true },
  ).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, userData, "User details updated successfully"));
});

const updateAvator = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avator is missing in path");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "error while uploading image to cloudinary");
  }

  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true },
  ).select("-password")

  res.status(200).json(new ApiResponse(200 , user , "Avator updated successfully"));
});

const getUserChannelProfile = asyncHandler(async(req ,res)=>{
  const {username} = req.param
  if(!username?.trim()){
    throw new ApiError(400, "Username is missing in path");
  }

  const channel = await User.aggregate([
    {
      $match:{
        username : username
      }
    },
    { 
      $lookup :{
        from : "subscriptions",
        localField : "_id",
        foreignField : "channel",
        as : "subscribers"
      }
    },
    {
      $lookup:{
        from:"subscriptions",
        localField : "_id",
        foreignField: "subscriber",
        as : "subscribedTo"
      }
    },
    {
      $addFields :{
        subscribersCount : {
          $size : "$subscribers"
        },
        subscribedToCount : {
          $size : "$subscribedTo"
        },
        isSubscribed :{
          $cond : {
            if:{$in : [req.user.id, "$subscribers.subscriber"]},
            then : true,
            else : false
          }
        }

      }
    },
    {
      $project:{
        fullName : 1,
        username : 1,
        subscribersCount : 1,
        isSubscribed : 1,
        subscribedToCount : 1,
        coverImage : 1,
        email : 1
      }
    }
  ])

  if(!channel?.length){
    throw new ApiError(404 , "Channel not found");
  }

  return res.status(200).json(new ApiResponse(200 , channel[0] , "Channel profile fetched successfully"));
});

 const getWatchHistory = asyncHandler(async(req , res)=>{
  const user = User.aggregate([
    {
      $match : {
        _id : (new mongoose.Types.ObjectId(req.user._id))
      }
    },
    {
      $lookup : {
        from : "videos",
        localField : "watchHistory",
        foreignField : "_id",
        as : "watchHistory",
        pipeline:[
          {
            $lookup : {
              from : "users",
              localField : "owner",
              foreignField : "_id",
              as : "owner",
              pipeline : [
                {$project : {
                  _id : 1,
                  username : 1,
                  avatar: 1
                }}
              ]
            }
          }
        ]
      }
    },
    {},
    {},
  ])

  return res.status(200).json(new ApiResponse(200, user[0], "Watch hitory fetched successfully"));
 })
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  getCurrentUser,
  updateUserDetails,
  updateAvator,
  getUserChannelProfile,
  getWatchHistory
};
