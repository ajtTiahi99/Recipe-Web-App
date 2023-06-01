import PostModel from '../Models/postModel.js'
import UserModel from '../Models/userModel.js'
import { updatePostsCreated } from './UserController.js'

//Create a post
export const createPost = async(req,res)=>{
    const newPost = new PostModel(req.body)
    try{
        const response = await newPost.save()
        const updateData = {
            currentUserId:newPost.userId,
            postsCreated:response._id.toString()
        }
        updatePostsCreated(updateData)
        res.status(200).json("Post Created!")

    }catch(error){
        res.status(500).json(error)
    }
}

//Get All Posts
export const getAllPosts = async(req,res) => {
    try{
        const allPosts = await PostModel.find({}).sort({_id:-1})
        res.status(200).json(allPosts)
    }catch(error){
        res.status(500).json(error)
    }    
}

//Get a specific post
export const getPost = async(req,res)=>{
    const id = req.params.id

    try{
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    }catch(error){
        res.status(500).json(error)
    }
}

//Update a post
export const updatePost = async(req,res)=>{
    const postId = req.params.id
    const {userId} = req.body

    try{
        const post = await PostModel.findById(postId)
        if(post.userId===userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Post Updated")
        }
        else{
            res.status(400).json("Action Forbidden")
        }
        res.status(200).json(post)
    }catch(error){
        res.status(500).json(error)
    }
}

//Delete a Post
export const deletePost = async(req,res)=>{
    const postId = req.params.id
    const {userId} = req.body.data

    try{
        const post = await PostModel.findById(postId)
        if(post.userId===userId){
            const user = await UserModel.findById(userId)
            if(user.postsCreated.includes(postId)){
                // Deleting Post from user's PostCreated
                await user.updateOne({$pull:{postsCreated:postId}})
                //Deleting Post from posts
                await post.deleteOne()
                res.status(200).json("Post removed from PostsCreated!")
            }
        }
        else{
            res.status(400).json("Action Forbidden")
        }
    }catch(error){
        res.status(500).json(error)
    }
}

//Like and Dislike a post
export const likePost = async(req,res) => {
    const id = req.params.id
    const {userId} = req.body

    try{
        const post = await PostModel.findById(id)
        
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}})
            res.status(200).json("Post Liked!")
        }
        else{
            await post.updateOne({$pull:{likes:userId}})
            res.status(200).json("Post Disliked!")
        }
    }catch(error){
        res.status(500).json(error)
    }
    
}

