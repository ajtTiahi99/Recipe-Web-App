import express from 'express'
import { createPost, getAllPosts, getPost, likePost,deletePost } from '../Controllers/PostController.js'
import authenticate from '../middleware/authenticate.js'


const router = express()


router.post('/',authenticate,createPost)
router.get('/feed',authenticate,getAllPosts)
router.get('/:id',authenticate,getPost)
router.delete('/:id',authenticate,deletePost)
router.put('/:id/like',authenticate,likePost)

export default router