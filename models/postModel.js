const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    red: 'User',
    required: true,
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
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  edits: {
    type: [{ timestamp: Date }],
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
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
})

exports.module = mongoose.model('Post', PostSchema)
