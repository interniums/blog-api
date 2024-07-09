const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 24,
    unique: true,
  },
})

exports.module = mongoose.model('Tag', TagSchema)
