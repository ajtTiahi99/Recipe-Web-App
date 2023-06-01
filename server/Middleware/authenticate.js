import jwt from 'jsonwebtoken'

const authenticate = (req,res,next) => {
  try{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({errMsg:"Unauthorized"})
    }

    const verified = jwt.verify(token,process.env.MY_SECRET)
    req.user = verified.user

    next()
  }catch(err){
    res.status(401).json({errMsg:"Unauthorized"})
  }
}

export default authenticate
