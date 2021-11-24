import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

// @desc   Fetch all users except admins
// @route  GET /users/
// @access Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false }).select('-password')
  res.json(users)
})

// @desc   Block a user
// @route  PATCH /users/:id/block
// @access Admin
export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.isBlocked = true
    user.save()
    res.json({ message: 'User blocked' })
  } else {
    res.status(400).json({ message: 'User not found' })
  }
})

// @desc   Un-block a user
// @route  PATCH /users/:id/unblock
// @access Admin
export const unBlockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.isBlocked = false
    user.save()
    res.json({ message: 'User Un-blocked' })
  } else {
    res.status(400).json({ message: 'User not found' })
  }
})
