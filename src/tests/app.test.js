const request = require('supertest')
const app = require('../app')

describe('Test app.js', () => {
  it('Should return array of todos', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toBeInstanceOf(Array)
  })

  it('Should add a todo', async () => {
    const success = await request(app).post('/').send({ _id: 0x000, title: 'This is a new todo', body: 'This todo has a body' })
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(success.body).toEqual(true)
    expect(response.body).toHaveLength(1)
  })
})
