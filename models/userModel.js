const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxLength: 16,
      minLength: 3,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: false,
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
      default: false,
    },
    registredDate: {
      type: Date,
      default: Date.now(),
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
