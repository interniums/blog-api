const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body

  // confirm data
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  // check duplicates
  const duplicateUsername = await User.findOne({ username }).lean().exec()
  const duplicateEmail = await User.findOne({ email }).lean().exec()
  if (duplicateUsername) {
    return res.status(409).json({ message: 'Username already in use.' })
  }
  if (duplicateEmail) {
    return res.status(409).json({ message: 'Email already in use.' })
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // create and store new user
  const userObject = { username, password: hashedPassword, email }
  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user ${username} created.` })
  } else {
    res.status(400).json({ message: 'Invalid user data recieved.' })
  }
})

const login = asyncHandler(async (req, res, next) => {})

module.exports = {
  register,
  login,
}
