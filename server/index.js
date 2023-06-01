import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRoute from './Routers/AuthRouter.js'
import UserRoute from './Routers/UserRouter.js'
import PostRoute from './Routers/PostRouter.js'


const app = express()
const PORT = process.env.PORT_NO || 5000
//listening on port 5000
app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`)
})

dotenv.config()

// middleware bodyParser
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
//middleware authentication
app.use(cookieParser())
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true
}
app.use(cors(corsOptions))

// connect to mongodb
mongoose.connect(`${process.env.MONGO_DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log("Connected to mongoDB")})
.catch((err)=>console.log(err))


//Routes Handling
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)

