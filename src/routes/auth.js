// Import our User schema
const User = require('../models/User.js')

// POST route to register a user
module.exports = app => {
  app.post('/auth/register', function (req, res) {
    console.log(req)
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
  app.get('/auth/register', (req, res) => {
    res.send('Hello world')
  })
}
