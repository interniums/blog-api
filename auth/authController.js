const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields required.' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res
      .status(400)
      .json({ message: 'User with provided email doesnt exist.' })
  }

  const pwdMatch = await bcrypt.compare(password, user?.password)
  console.log(pwdMatch)
  console.log(user?.password)
  if (!pwdMatch) {
    return res.status(400).json({ message: 'Incorrect password.' })
  }

  const accessToken = jwt.sign(
    {
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
  )
  const refreshToken = jwt.sign(
    {
      username: user.username,
    },
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  )
  user.refresh_token = refreshToken
  const result = await user.save()
  console.log(result)

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.json({ accessToken })
})

module.exports = {
  register,
  login,
}
