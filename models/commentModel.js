const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    edits: {
      type: [{ timestamp: Date }],
    },
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
