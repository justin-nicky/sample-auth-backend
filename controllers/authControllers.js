import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import mongoose from 'mongoose'

// @desc   Register a new user
// @route  POST /auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201)
    res
      .cookie('token', generateToken(user._id), { httpOnly: true })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc   login user and get token
// @route  POST /auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user.isDisabled) {
    res.status(401)
    throw new Error('Not Authorized, Blocked User.')
  }
  if (user) {
    if (!(await user.matchPassword(password))) {
      res.status(401)
      throw new Error('Incorrect Password.')
    }

    res.cookie('token', generateToken(user._id), { httpOnly: true }).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials.')
  }
})

// @desc   logout user
// @route  GET /auth/logout
// @access Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).send()
})
