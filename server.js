const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const passport = require('passport');
const db = require('./config/database');
const user_route = require('./routes/User');
app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post dat
app.use(bodyParser.urlencoded({ extended: true }));

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
