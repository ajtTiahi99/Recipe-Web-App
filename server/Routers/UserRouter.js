import express from 'express'
import { getUser, savePost, updateUser, getSavedPosts } from '../Controllers/UserController.js'
import authenticate from '../middleware/authenticate.js'


const router = express.Router()


router.get('/:id',authenticate,getUser)
router.put('/:id',authenticate,updateUser)
router.put('/:id/save',authenticate,savePost)
router.get('/:id/saved',authenticate,getSavedPosts)


export default router