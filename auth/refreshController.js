const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const refreshToken = async (req, res, next) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(401)
  console.log(cookies.jwt)
  const refresh_token = cookies.jwt

  const user = await User.findOne({ refresh_token }).exec()
  if (!user) return res.sendStatus(403)

  jwt.verify(
    refresh_token,
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err || user.username !== decoded.username) return res.sendStatus(403)
      const access_token = jwt.sign(
        { username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )
      res.json({ access_token })
    }
  )
}

module.exports = {
  refreshToken,
}
