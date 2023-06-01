import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        tag:{
            type:String,
            required:true
        },
        ingredients:[],
        instructions:{
            type:String,
            required:true
        },
        recipeImage:String,
        likes:[]
    },
    {timestamps:true}
)

const PostModel = mongoose.model("post",postSchema)
export default PostModel
