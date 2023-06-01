//registering a user
import UserModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const userRegister = async(req,res) =>{
    const {userName,email,password} = req.body
    const existingUser = await UserModel.findOne({email:email})
    if(existingUser){
        return res.status(400).json({errMsg:"An account with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10)
    
    const passwordHash = await bcrypt.hash(password,salt)
    const newUser = new UserModel({
        userName,
        email,
        password:passwordHash
    })
    try{
        const savedUser = await newUser.save()
        res.status(200).json({msg:"Saving User"})
    }catch(error){
        console.log(error)
        res.status(500).json({errMsg:error.message})
    }

}

export const userLogin = async(req,res) =>{
    const {email,password} = req.body
    try{
        const existingUser = await UserModel.findOne({email})
        if(!existingUser){
            return res.status(400).json({errMsg:"No user found with this email"})
        }
        const passwordCorrect = await bcrypt.compare(password,existingUser.password)

        //log the user in with token
        const token = jwt.sign({
            user: existingUser._id,
        },
            process.env.MY_SECRET
        )
        // send the token in a http-only cookie
        res.cookie("token",token,{
            httpOnly:true,
            expires:new Date(Date.now()+3600000)
        })
        
        if(!passwordCorrect){
            return res.status(400).json({errMsg:"Wrong password."})
        } 
        else{
            return res.status(200).json(existingUser)             
        }
    }catch(error){
        res.status(500).json({errMsg:error.message})
    }
}


export const userLogOut = (req,res) => {
    res.cookie("token","",{
        httpOnly:true,
        expires: new Date(0)
    }).send()
}

//Check if user is logged in
export const loggedIn = (req,res) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.json(false)
        }
    
        const response = jwt.verify(token,process.env.MY_SECRET)
        res.send(true)

      }catch(err){
        res.json(false)
      }
}