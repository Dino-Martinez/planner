const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../app')
const Todo = require('../models/todos')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Test app.js', () => {
  // Before and after are only defined within the context of the Mocha runtime environment
  // eslint-disable-next-line no-undef
  before(function () {
    console.log('Running tests...')
  })

  // eslint-disable-next-line no-undef
  after(async function () {
    await Todo.deleteMany({})
  })

  it('Should return array of todos', async function () {
    const response = await chai.request(app).get('/')
    assert.strictEqual(response.statusCode, 200, 'Response code success')
    assert.isDefined(response.body, 'Response body is defined')
    assert.isArray(response.body)
  })

  it('Should add a todo', async function () {
    const success = await chai.request(app).post('/').send({ title: 'This is a new todo', body: 'This todo has a body' })
    const response = await chai.request(app).get('/')
    assert.strictEqual(response.statusCode, 200, 'Reponse code success')
    assert.isObject(success.body, 'Success response received')
    assert.isNotEmpty(response.body, 'Array has at least one todo')
  })
})
