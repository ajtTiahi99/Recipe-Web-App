import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }, 
        description:String,
        profilePicture:String,
        coverPicture:String,
        location:String,
        postsCreated:[],
        savedPosts:[]
    },
    {timestamps:true}
)

const UserModel = mongoose.model("user",userSchema)
export default UserModel