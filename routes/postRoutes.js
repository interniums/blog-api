const express = require('express')
const postRoutes = express.Router()
const postController = require('../controllers/postController')

postRoutes
  .route('/post')
  .get(postController.getAllPosts)
  .post(postController.createPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = postRoutes
