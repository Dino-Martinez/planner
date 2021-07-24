// Import our User schema
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

// POST route to register a user
module.exports = app => {
  app.post('/auth/signup', function (req, res) {
    const { email, password } = req.body
    const user = new User({ email, password })
    user.save(function (err) {
      if (err) {
        res.status(500)
          .send('Error registering new user please try again.')
      } else {
        res.status(200).send('Welcome to the club!')
      }
    })
  })

  app.post('/auth/login', function (req, res) {
    const { email, password } = req.body
    User.findOne({ email }, function (err, user) {
      if (err) {
        console.error(err)
        res.status(500)
          .json({
            error: 'Internal error please try again'
          })
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          })
      } else {
        user.isCorrectPassword(password, function (err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
              })
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
              })
          } else {
            // Issue token
            const payload = { email }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: '1h'
            })
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200)
          }
        })
      }
    })
  })
}
