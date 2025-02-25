import mongoose from "mongoose";
import { Comment } from "./comment.model";
import { Tweet } from "./tweet.model";

const likeSchema = new mongoose.Schema(
  {
    Comment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
    Video: {
      type: mongoose.Types.ObjectId,
      ref: "Video",
    },
    Tweet: {
      type: mongoose.Types.ObjectId,
      ref: "Tweet",
    },
    likedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timeseries: true },
);

export const Like = mongoose.model("Like", likeSchema);
