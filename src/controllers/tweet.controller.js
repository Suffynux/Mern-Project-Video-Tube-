import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Tweet} from "../models/tweet.model.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const userId = req.user._id;
    const {content} = req.body

    if(!userId){
        throw new ApiError(400, "User not found")
    }
    if(!content || content == ""){
        throw new ApiError(400, "Content required")
    }
    const tweet = await Tweet.create({
        content : content,
        owner : userId
    })

    if(!tweet){
        throw new ApiError(400, "Error while creating tweet")
    }
    
    res.status(200).json(new ApiResponse(200 , tweet , "Tweet created successfully"))

})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {createTweet}