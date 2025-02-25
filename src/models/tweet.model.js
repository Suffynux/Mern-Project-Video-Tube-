import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : mongoose.Types.ObjectId,
        require : true
    }
}, { timeseries: true });

export const Tweet = mongoose.model("Playlist", tweetSchema);
