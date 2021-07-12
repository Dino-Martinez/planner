module.exports = app => {
  const todos = []
  app.get('/', (req, res) => {
    res.json(todos)
  })

  app.post('/', (req, res) => {
    todos.push(req.body)
    res.send(true)
  })
}
