import UserModel from "../Models/userModel.js";

//Get a user from DB
export const getUser = async(req,res)=>{
    const id = req.params.id

    try{
        const user = await UserModel.findById(id)
        if(user){
            const {password,...otherDetails} = user._doc
                res.status(200).json(otherDetails)
        }else{
            res.status(400).json("No such user exists.")
        }
    }catch(error){
        res.status(500).json(error)
    }
}


//Update a user
export const updateUser = async(req,res)=>{
    const id = req.params.id
    const {currentUserId} = req.body

    if(id===currentUserId){
        try{
            const user = await UserModel.findByIdAndUpdate(
                id,
                req.body,
                {new:true}
            )
            res.status(200).json(user)
        }
        catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(400).json("Access denied. You can only update your own profile!")
    }
}
//Update a userPostsCreated Field
export const updatePostsCreated = async(params)=>{
    const {currentUserId,postsCreated} = params

    try{
        await UserModel.findByIdAndUpdate(
            currentUserId,
            {$push:{postsCreated}},
            {new:true}
        )
    }
    catch(error){
        console.log(error);
    }
}

//Save a Post
export const savePost = async(req,res)=>{
    const userId = req.params.id
    const {postId,...otherData} = req.body

    try{
        const user = await UserModel.findById(userId)
        
        if(user.savedPosts.includes(postId)){
            await user.updateOne({$pull:{savedPosts:postId}})
            res.status(200).json("Post removed from saved!")
        }
        else{
            await user.updateOne({$push:{savedPosts:postId}})
            res.status(200).json("Post saved!")
            console.log(user);

        }
    }catch(error){
        res.status(500).json(error)
    }
}

export const getSavedPosts = async(req,res) => {
    const userId = req.params.id
    try{
        const user = await UserModel.findById(userId)
        console.log(user);
        res.status(200).json(user.savedPosts)
    }catch(error){
        res.status(500).json(error)
    } 
}