import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber : {
            type : Schema.Types.ObjectId, //refering to a user who is subscribing
            ref : "User"
        },

        channel : {
            type : Schema.Types.ObjectId, //One to whom Subscriber  is subscribing
            ref : "User"
        }
    }
)