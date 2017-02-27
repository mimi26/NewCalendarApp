var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const events = require('./routes/events.js');

//const index = require('./routes/index');
const authRoutes = require('./routes/auth.js');
// const userRoutes = require('./routes/user.js');
const app = express();

require('dotenv').config();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//app.use('/', index);

// app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/events', events);
app.use(express.static(path.join(__dirname, 'client/build')));

//use for dealing with database
// app.post('/api/new', (req, res) => {
//   res.json({ message: 'hello world' });
//     });

// app.post('/api/register', (req, res) => {
//   console.log(req);
// })
// Always return the main index.html, so react-router can render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("error: ", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
