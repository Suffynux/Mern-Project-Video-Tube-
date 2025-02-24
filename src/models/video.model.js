import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new  mongoose.Schema(
    {
        videoFile : {
            type : String, //Cloudnary string 
            require : true
        },
        thumbnail : {
            type : String,
            require : true, //Cloudnary string 
        },
        title : {
            type : String,
            require : true,
        },
        description : {
            type : String,
            require : true,
        },
        duration : {
            type : Number,
            require : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true  
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    } , 
    {
        timestamps : true
    }
)

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
