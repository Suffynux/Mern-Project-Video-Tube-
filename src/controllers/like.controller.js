import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;
  console.log("working");

  if (!userId) {
    throw new ApiError(400, "User not found");
  }
  //TODO: toggle like on video
  if (!videoId) {
    throw new ApiError(400, "Video not found");
  }

  const existedLike = await Like.findOne({ Video: videoId });
  if (existedLike) {
    await Like.deleteOne(existedLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Unliked succesfully"));
  }

  const like = await Like.create({
    Video: videoId,
    likedBy: userId,
  });
  return res.status(200).json(new ApiResponse(200, like, "liked succesfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  //TODO: toggle like on comment
  if (!commentId) {
    throw new ApiError(400, "Comment not found");
  }

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const existedLikedComment = await Like.findOne({
    Comment: commentId,
    likedBy: userId,
  });

  if (existedLikedComment) {
    await Like.findByIdAndDelete(existedLikedComment._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Unliked succesfully"));
  } else {
    const like = await Like.create({
        Comment: commentId,
        likedBy: userId,
      });
    
      return res.status(200).json(new ApiResponse(200, like, "liked succesfully"));
  }


});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User not found");
  }

  const likedVideos = await Like.find({
    likedBy : new mongoose.Types.ObjectId(userId),
    Video: { $ne: null }
})

  return res.status(200).json(new ApiResponse(200 , likedVideos , "Liked videos fetched successfully"))
});




export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
