import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    videos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
  },
  { timeseries: true },
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
