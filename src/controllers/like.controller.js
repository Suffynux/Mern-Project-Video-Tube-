import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id

    if(!userId) {
        throw new ApiError(400 , "User not found")
    }
    //TODO: toggle like on video
    if(!videoId) {
        throw new ApiError(400 , "Video not found")
    }
    const existedLike = await Like.find({Video : videoId})
    if (existedLike) {

        const dislike = await Like.findByIdAndDelete(existedLike._id)
        return res.status(200).json(new ApiResponse(200 ,  dislike , "Unliked succesfully"))

    } else {

        const like = await Like.create({
            Video : videoId,
            likedBy : userId
        })
        return res.status(200).json(new ApiResponse(200 ,  like , "Unliked succesfully"))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const userId = req.user._id
    //TODO: toggle like on comment
    if(!commentId) {
        throw new ApiError(400 , "Comment not found")
    }

    if(!userId) {
        throw new ApiError(400 , "User not found")
    }

    const existedLikedComment = await Like.find({
        Comment : commentId
    })

    if(existedLikedComment) {

        const dislikeComment = await Like.findByIdAndDelete(existedLikedComment._id)
        return res.status(200).json()
        
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const {userId} = req.params

})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}