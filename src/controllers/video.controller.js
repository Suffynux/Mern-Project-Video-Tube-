import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Video } from "../models/video.model.js";
import mongoose from "mongoose";

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    // Check for user
    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized: User not found");
    }

    // Debug file information
    console.log("Files received:", {
        video: req.files?.video?.[0],
        thumbnail: req.files?.thumbnail?.[0]
    });

    const videoFile = req.files?.video?.[0]?.path;
    const thumbnailFile = req.files?.thumbnail?.[0]?.path;

    if (!videoFile || !thumbnailFile) {
        throw new ApiError(400, "Both video and thumbnail are required");
    }
    console.log(videoFile);
    
    // Upload files one at a time for better error handling
    console.log("Uploading video to Cloudinary...");
    const videoUpload = await uploadOnCloudinary(videoFile, {});
    if (!videoUpload) {
        throw new ApiError(500, "Video upload failed");
    }

    console.log("Uploading thumbnail to Cloudinary...");
    const thumbnailUpload = await uploadOnCloudinary(thumbnailFile);
    if (!thumbnailUpload) {
        throw new ApiError(500, "Thumbnail upload failed");
    }

    const videoData = {
        videoFile: videoUpload.url,
        thumbnail: thumbnailUpload.url,
        title,
        description,
        duration: videoUpload.duration || 0,
        owner: req.user._id,
        isPublished: true
    };

    const createdVideo = await Video.create(videoData);
    
    return res.status(201).json(
        new ApiResponse(201, createdVideo, "Video uploaded successfully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    console.log(videoId);

    const video = await Video.findById(videoId)
    console.log(video);
    
    return res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"))
});

const updateVideo = asyncHandler(async (req, res) => {
    console.log("updateing Video and thumbnail")
    const { videoId } = req.params
    if(!videoId) {
        throw new ApiError(400, "Video not Found")
    }
    const videoLocalPath = req.files?.video?.[0]?.path;
    if(!videoLocalPath){
        throw new ApiError(400, "Error while getting video")
    }

    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
    if(!thumbnailLocalPath){
        throw new ApiError(400, "Error while getting thumbnail")
    }

    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    const updatedVideo = await Video.findByIdAndUpdate(videoId , {
        $set : {
            video :video?.url,
            thumbnail : thumbnail?.url || "" 
        }
    }, {new : true}
)

    return res.status(200).json(new ApiResponse(200 , updatedVideo, "Video and thumbnail updated successfully"))
})

const UpdateVideoDetails = asyncHandler(async(req , res)=>{
    //TODO: update video details like title, 
    console.log("Update is working ");
    
    const {title , description} = req.body;
    if(!title && !description){
        throw new ApiError(400 ,"Title and descritption required")
    }
    const {videoId} = req.params
    const video = await Video.findById(videoId) 
    const updatedVideoData = await Video.findByIdAndUpdate(
        video,
        {
            $set : {
                title : title,
                description : description
            }
        },
        {new : true}
    )

    return res.status(200).json(new ApiResponse(200, updatedVideoData , "Title and descrition updated successfully"))
})
const deleteVideo = asyncHandler(async(req , res)=>{
    //TODO: update video details like title, 
    const {videoId} = req.params;
    if(!videoId){
        throw new ApiError(400, "Video not found")
    }
    const video = await Video.findById(videoId) 
    const deletedVideo = await Video.findByIdAndDelete(video)
    if(!deletedVideo){
        throw new ApiError(400 , "Erro while deleting video")
    }
    return res.status(200).json(new ApiResponse(200, deletedVideo , "Video Deleted Successfully"))
})

export { publishAVideo , getVideoById , updateVideo , UpdateVideoDetails , deleteVideo  };
