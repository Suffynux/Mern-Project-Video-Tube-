import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true, //convert to lowercase
      trim: true, //remove white space
      index: true, //unable your field for searching
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true, //convert to lowercase
      trim: true, //remove white space
    },
    fullName: {
      type: String,
      require: true,
      trim: true, //remove white space
      index: true,
    },
    avatar: {
      type: String, // We will use the online cloud service
      require: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
