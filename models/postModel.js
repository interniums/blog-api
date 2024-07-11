const mongoose = require('mongoose')
const { CommentSchema } = require('./commentModel')

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  img: {
    url: [String],
    default: [],
  },
  title: {
    type: String,
    minLength: 3,
    maxLength: 99,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 24,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  edits: {
    type: [{ timestamp: Date }],
    default: [],
  },
  comments: {
    type: [CommentSchema],
    required: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
})

module.exports = mongoose.model('Post', PostSchema)
