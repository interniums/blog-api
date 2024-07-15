const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const logout = async (req, res, next) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(204)
  const refresh_token = cookies.jwt

  const user = await User.findOne({ refresh_token }).exec()
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true })
    return res.sendStatus(204)
  }

  user.refresh_token = ''
  const result = await user.save()
  console.log(result)

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.sendStatus(204)
}

module.exports = {
  logout,
}
