// Mongoose models
const Todo = require('../models/todos')

module.exports = app => {
  // Create a new todo
  app.post('/', (req, res) => {
    const todo = new Todo(req.body)
    todo.save().then(doc => {
      res.send({ todo: doc })
    }).catch(err => {
      res.status(400).send(err.errors)
    })
  })

  // Read all todos
  app.get('/', (req, res) => {
    Todo.find().lean().then(todos => {
      res.json(todos)
    }).catch(err => {
      res.status(400).send(err.errors)
    })
  })

  // Read one todo
  app.get('/:id', (req, res) => {
    Todo.findById(req.params.id).lean().then(todo => {
      res.json(todo)
    }).catch(err => {
      res.status(400).send(err.errors)
    })
  })

  // Update one todo
  app.put('/:id', (req, res) => {
    const options = {
      // Return the document after updates are applied
      new: true,
      // Create a document if one isn't found. Required
      // for `setDefaultsOnInsert`
      upsert: true,
      setDefaultsOnInsert: true
    }
    Todo.findByIdAndUpdate(req.params.id, req.body, options).then(doc => {
      res.send(doc)
    }).catch(err => {
      res.status(400).send(err.errors)
    })
  })

  // Delete one todo
  app.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id).then(() => {
      res.json({ success: true })
    })
  })
}
