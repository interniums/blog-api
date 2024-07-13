const express = require('express')
const categoryRoutes = express.Router()
const categoryController = require('../controllers/categoryController')

categoryRoutes
  .route('/create/category')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)

module.exports = categoryRoutes
