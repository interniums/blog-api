const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' })
  res.render('index', { title: 'Express', messages: 'Hello' })
})

module.exports = router