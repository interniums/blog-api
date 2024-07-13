const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')

const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().lean()
  if (!categories?.length) {
    return res.status(400).json({ message: 'No categories found. ' })
  }
  res.json(categories)
})

const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Category name required.' })
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'Category name should be at least 3 characters. ' })
  }

  const categoryObject = { name: name }
  const category = await Category.create(categoryObject)

  if (category) {
    res.status(201).json({ message: `New category ${name} created. ` })
  } else {
    res.status(400).json({ message: 'Invalid category data recieved. ' })
  }
})

const updateCategory = asyncHandler(async (req, res, mext) => {})

const deleteCategory = asyncHandler(async (req, res, next) => {})

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
}
