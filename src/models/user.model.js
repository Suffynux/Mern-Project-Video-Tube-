import mongoose, { Schema } from "mongoose";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

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

// Mongo db hook(middleware) for
userSchema.pre("save", async function (next) {
  let passwordSalt = 10;
  if (!this.isModified("password")) return next();
  this.password = bcyrpt.hash(this.password, passwordSalt);
  next();
});

// Custom Moongoose Method for Password check
userSchema.methods.isPasswordCorrect = async function (password) {
  let checkedPassword = await bcyrpt.compare(password, this.password);
  return checkedPassword;
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )

};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
};
export const User = mongoose.model("User", userSchema);
