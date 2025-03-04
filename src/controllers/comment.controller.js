import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";


const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  // getting data from body
  const { videoId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!videoId) {
    throw new ApiError(400, "Video not found");
  }
  if (!content || content == "") {
    throw new ApiError(400, "Comment is required");
  }
  // video find
  const video = await Video.findById(videoId);

  // creating docuement in comment
  const comment = await Comment.create({
    content: content,
    video: video,
    owner: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added Successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  const { commentId } = req.params;

  if (!content && commentId) {
    throw new ApiError(400, "Comment doest not found");
  }

  const UpdatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content,
      },
    },
    {
      new: true,
    },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, UpdatedComment, "Comment Updated Successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const {commentId} = req.params;

 const deletedComment = await Comment.findByIdAndDelete(commentId);

 return res.status(200).json(new ApiResponse(200, deletedComment , "Comment Deleted Successfully"))
});

const getAllComments = asyncHandler(async(req , res)=>{
  const {videoId} = req.params;

  const comments = await Comment.find({video : videoId}).populate("owner" , "fullName email").sort({createdAt : -1})

  if(!comments){
    throw new ApiError(400, "Comments not found")
  }

  res.status(200).json(new ApiResponse(200, comments , "Comments fetched Successfully"))
})

export { addComment, updateComment , deleteComment , getAllComments };
