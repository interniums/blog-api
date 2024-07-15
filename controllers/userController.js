const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// desc: get all users
// route: GET /users
// access: Private
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found.' })
  }
  res.json(users)
})

// desc: update user
// route: PATCH /users
// access: Private
const updateUser = asyncHandler(async (req, res, next) => {
  const { id, username, admin, active, password } = req.body

  // confirm data
  if (!id || !username || typeof active !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required. ' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found. ' })
  }

  // check duplicates
  const duplicateUsername = await User.findOne({ username }).lean().exec()
  const duplicateEmail = await User.findOne({ email }).lean().exec()
  if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
    return res.status(409).json({ message: 'Username already in use.' })
  }
  if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
    return res.status(409).json({ message: 'Email already in use.' })
  }

  user.username = username
  user.email = email
  user.active = active

  if (password) {
    // hash password
    user.password = await bcrypt.hash(password, 10)
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated.` })
})

// desc: delete user
// route: DELETE /users
// access: Private
const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User ID reqeuired. ' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found.' })
  }

  const result = await user.deleteOne(user)
  res.json({ message: `Username ${result.username} with ID:${id} deleted. ` })
})

module.exports = {
  getAllUsers,
  // createUser,
  updateUser,
  deleteUser,
}
