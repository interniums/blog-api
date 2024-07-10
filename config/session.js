const session = require('express-session')
const MongoStore = require('connect-mongo')

const sessionMiddleware = session({
  name: 'some_session_name',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
})

module.exports = sessionMiddleware
