import express from 'express'
import { protect, admin } from '../middlewares/authMiddleware.js'
import {
  blockUser,
  getAllUsers,
  unBlockUser,
} from '../controllers/userControllers.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllUsers)
router.patch('/:id/block', protect, admin, blockUser)
router.patch('/:id/unblock', protect, admin, unBlockUser)

export default router
