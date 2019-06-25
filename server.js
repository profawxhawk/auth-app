const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const passport = require('passport');
const db = require('./config/database');
const user_route = require('./routes/User');
const ImageRouter = require('./routes/image');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post dat
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
// app.use(
//   cors({
//     allowedHeaders: ['Access-Control-Allow-Headers'], // headers that React is sending to the API
//     //'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false
//   })
// );
db.sequelize
  .authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log('error: ' + err));

app.get('/', function(req, res) {
  res.send('Welcome to Passport with Sequelize');
});
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
app.use('/user', user_route);
app.use('/image', ImageRouter);
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () =>
  console.log(`Server up and running on port ${port} !`)
);
