const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const router = require('./routes/index')
const categoryRoutes = require('./routes/categoryRoutes')
const connectDB = require('./config/db')
const sessionMiddleware = require('./config/session')
const cors = require('cors')

const app = express()
connectDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(sessionMiddleware)

app.use('/', router)
app.use('/', userRoutes)
app.use('/', postRoutes)
app.use('/', categoryRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
