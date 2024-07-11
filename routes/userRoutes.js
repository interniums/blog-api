const express = require('express')
const userRoutes = express.Router()
const userController = require('../controllers/userController')

userRoutes
  .route('/user')
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = userRoutes
