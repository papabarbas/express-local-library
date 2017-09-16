var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var compression = require('compression')

// Import routes
var index = require('./routes/index')
var users = require('./routes/users')
var catalog = require('./routes/catalog') // Import routes for "catalog" area of site

var app = express()

var mongoDB = 'mongodb://papatest:papatestio@ds135444.mlab.com:35444/library_data'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')x

// uncomment after placing your favicon in /public

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(compression())
app.use('/', index)
app.use('/users', users)
app.use('/catalog', catalog)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
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
