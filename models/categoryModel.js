const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32,
  },
})

exports.module = mongoose.model('Category', CategorySchema)
