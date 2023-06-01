import express from 'express'
import { loggedIn, userLogin, userLogOut, userRegister } from '../Controllers/AuthController.js';

const router = express.Router()

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/logout',userLogOut)
router.get('/loggedIn',loggedIn)


export default router;