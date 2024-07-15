const express = require('express')
const refreshRoutes = express.Router()
const refreshController = require('./refreshController')

refreshRoutes.get('/', refreshController.refreshToken)

module.exports = refreshRoutes
