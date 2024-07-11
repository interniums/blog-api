const Post = require('../models/postModel')
const asyncHandler = require('express-async-handler')

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().lean()
  if (!posts?.length) {
    return res.status(400).json({ message: 'No posts found. ' })
  }
  res.json(posts)
})

const createPost = asyncHandler(async (req, res, next) => {
  const { author, title, content, category, img } = req.body

  if (!author || !title || !content || !category) {
    return res.status(400).json({ message: 'All fields are required. ' })
  }

  if (category?.length > 3) {
    return res
      .status(400)
      .json({ message: 'No more than 3 category are allowed.' })
  }
  if (title?.length < 3) {
    return res
      .status(400)
      .json({ message: 'Title should be more than 3 characters.' })
  }
  if (content?.length < 24) {
    return res
      .status(400)
      .json({ message: 'Content should be more than 3 characters. ' })
  }
  if (img?.length > 32) {
    return res
      .status(400)
      .json({ message: 'No more than 32 images is required.' })
  }

  const postObject = { author, title, content, category, img }
  const post = await Post.create(postObject)

  if (post) {
    res.status(201).json({ message: `New blog post ${post._id} was created.` })
  } else {
    res.status(400).json({ message: 'Invalid post data recieved.' })
  }
})

const updatePost = asyncHandler(async (req, res, next) => {
  const { id, title, content, category, img } = req.body
  const post = await Post.findById(id).exec()

  if (category?.length > 3) {
    return res
      .status(400)
      .json({ message: 'No more than 3 category are allowed.' })
  }
  if (title?.length < 3) {
    return res
      .status(400)
      .json({ message: 'Title should be more than 3 characters.' })
  }
  if (content?.length < 24) {
    return res
      .status(400)
      .json({ message: 'Content should be more than 3 characters. ' })
  }
  if (img?.length > 32) {
    return res
      .status(400)
      .json({ message: 'No more than 32 images is required.' })
  }

  post.title = title
  post.content = content
  post.img = img
  post.category = category

  const updatedPost = await post.save()
  res.json({ message: `Post ${id} was updated.` })
})

const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Post ID required.' })
  }

  const post = await Post.findById(id).exec()
  if (!post) {
    return res.status(400).json({ message: `Post ${id} not found.` })
  }
  const result = await post.deleteOne()
  res.json({ message: `Post with ID ${id} was deleted.` })
})

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
}
