import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Video } from "../models/video.model.js";

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, duration } = req.body;

    // Validate required fields
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized: User not found");
    }
    const user = req.user._id;

    // Extract file paths safely
    const videoFile = req.files?.video?.[0]?.path;
    const thumbnailFile = req.files?.thumbnail?.[0]?.path;

    if (!videoFile || !thumbnailFile) {
        throw new ApiError(400, "Both video and thumbnail are required");
    }

    try {
        console.log("Uploading video...");
        const [video, thumbnail] = await Promise.all([
            uploadOnCloudinary(videoFile),
            uploadOnCloudinary(thumbnailFile)
        ]);

        console.log("Video uploaded:", video?.url);
        console.log("Thumbnail uploaded:", thumbnail?.url);

        const createdVideo = await Video.create({
            videoFile: video?.url,
            thumbnail: thumbnail?.url || "",
            title,
            description,
            duration: duration || 0,
            owner: user,
            isPublished: false
        });

        return res.status(201).json(new ApiResponse(200, createdVideo, "Video created successfully"));
    } catch (error) {
        console.error("Error uploading video:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});

export { publishAVideo };
