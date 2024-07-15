const express = require('express')
const logoutRoutes = express.Router()
const logoutController = require('./logoutController')

logoutRoutes.get('/', logoutController.logout)

module.exports = logoutRoutes
