const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 16,
    minLength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    maxLength: 64,
  },
  lastName: {
    type: String,
    maxLength: 64,
  },
  password: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    require: true,
  },
  registredDate: {
    type: Date,
    default: Date.now(),
  },
  posts: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
})

module.exports = mongoose.model('User', UserSchema)
