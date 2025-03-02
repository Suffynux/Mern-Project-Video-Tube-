import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if(!name || !description){
        throw new ApiError(400 , "Name and description required for playlist")
    }

    const playlist = await Playlist.create({
        name  : name,
        description : description
    })
    
    if(!playlist) {
        throw new ApiError(400 , "Error while creating playlist")
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist created succesfully"));
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if(!userId) {
        throw new ApiError(400 , "User not found")
    }

    const userPlaylists = await Playlist.find({owner : userId})

    return res.status(200).json(new ApiResponse(200 , userPlaylists , "Playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!playlistId) {
        throw ApiError(400 , "Playlist not found")
    }

    const playlist = await Playlist.findById(playlistId)

    if(!playlist) {
        throw new ApiError(400 , "Playlist not found")
    }

    return res.status(200).json(new ApiResponse(200 , playlist , "Playlist fetched successfully"))
})


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!playlistId || !videoId) {
        throw new ApiError(400 , "Playlist or video not found")
    }

    const playlist = Playlist.findById(playlistId);

    if(playlist.videos.includes(videoId)){
        throw new ApiError(400 , "Video already in playlist")
    }

    playlist.videos.push(videoId);
    await playlist.save();

    return res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist successfully"));
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    // Validate input
    if (!playlistId || !videoId) {
        throw new ApiError(400, "Playlist ID and Video ID are required");
    }

    // Find the playlist
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    // Check if the video exists in the playlist
    if (!playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video not found in playlist");
    }

    // Remove the video from the playlist
    playlist.videos = playlist.videos.filter(id => id.toString() !== videoId);

    // Save the updated playlist
    await playlist.save();

    return res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist successfully"));
});


const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!playlistId) {
        throw new ApiError(400 , "Playlist not found")
    }

    await Playlist.findByIdAndDelete(playlistId)
    await Playlist.save()
})

// const updatePlaylist = asyncHandler(async (req, res) => {
//     const {playlistId} = req.params
//     const {name, description} = req.body
//     //TODO: update playlist
// })

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}