const express = require('express')
const authRoutes = express.Router()
const authController = require('../controllers/authController')

authRoutes.post('/registration', authController.register)
authRoutes.post('/login', authController.login)

module.exports = authRoutes
