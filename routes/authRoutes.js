import express from 'express'
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authControllers.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/logout').get(logoutUser)

export default router
