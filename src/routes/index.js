// Mongood models
const Todo = require('../models/todos')

module.exports = app => {
  app.get('/', (req, res) => {
    Todo.find().lean().then(todos => {
      res.json(todos)
    })
  })

  app.post('/', (req, res) => {
    const todo = new Todo(req.body)
    todo.save().then(doc => {
      res.send({ todo: doc })
    }).catch(err => {
      res.status(400).send(err.errors)
    })
  })
}
