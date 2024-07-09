const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  },
  likes: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    edits: {
      type: [{ timestamp: Date }],
    },
  },
})

exports.module = mongoose.model('Comment', CommentSchema)
