const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const keys = require('../config/keys');
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  db.user.findOne({ where: { email: req.body.email } }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new db.user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        last_login: new Date()
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  db.user.findOne({ where: { email } }).then(user => {
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ usernotfound: 'Email ID or Password not found in database' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email,
          firstname: user.firstname
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 10000 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({
          usernotfound: 'Email ID or Password not found in database'
        });
      }
    });
  });
});
// router.get('/', (req, res) =>
//   db.user
//     .create({
//       id: 1,
//       firstname: 'bharath',
//       lastname: 'pro',
//       email: 'assasingameriv@gmail.com',
//       password: '12345678'
//     })
//     .then(user => {
//       console.log(user);
//       res.sendStatus(200);
//     })
//     .catch(err => console.log('ERROR: ' + err))
// );

module.exports = router;
