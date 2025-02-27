import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        require : true
    }
}, { timeseries: true });

export const Tweet = mongoose.model("Tweet", tweetSchema);
