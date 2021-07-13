const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../app')
const Todo = require('../models/todos')
const SAMPLE_OBJECTID = '60ed0eaf1df2ba3be8646211'
// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Test app.js', () => {
  // Before and after are only defined within the context of the Mocha runtime environment
  // eslint-disable-next-line no-undef
  before(async function () {
    const todo = new Todo({ _id: SAMPLE_OBJECTID, title: 'This is the first todo', body: 'this body is meaningless' })
    await todo.save()
  })

  // eslint-disable-next-line no-undef
  after(async function () {
    await Todo.deleteMany({})
  })

  it('Should add a todo', async function () {
    const success = await chai.request(app).post('/').send({ title: 'This is a new todo', body: 'This todo has a body' })
    const response = await chai.request(app).get('/')
    assert.strictEqual(response.statusCode, 200, 'Reponse code success')
    assert.isObject(success.body, 'Success response received')
    assert.lengthOf(response.body, 2, 'Array has two todos')
  })

  it('Should return array of todos', async function () {
    const response = await chai.request(app).get('/')
    assert.strictEqual(response.statusCode, 200, 'Response code success')
    assert.isDefined(response.body, 'Response body is defined')
    assert.isArray(response.body)
  })

  it('Should return a single todo', async function () {
    const response = await chai.request(app).get(`/${SAMPLE_OBJECTID}`)
    assert.strictEqual(response.statusCode, 200, 'Response code success')
    assert.isDefined(response.body, 'Response body is defined')
    assert.isObject(response.body)
    assert.strictEqual(response.body.title, 'This is the first todo', 'The correct todo was returned')
  })

  it('Should update a single todo', async function () {
    const success = await chai.request(app).put(`/${SAMPLE_OBJECTID}`).send({ title: 'This is an updated todo' })
    const response = await chai.request(app).get(`/${SAMPLE_OBJECTID}`)
    assert.isObject(success.body, 'Success response received')
    assert.strictEqual(response.statusCode, 200, 'Response code success')
    assert.isDefined(response.body, 'Response body is defined')
    assert.isObject(response.body)
    assert.strictEqual(response.body.title, 'This is an updated todo', 'The correct todo was returned')
  })

  it('Should delete a single todo', async function () {
    const success = await chai.request(app).delete(`/${SAMPLE_OBJECTID}`)
    const response = await chai.request(app).get(`/${SAMPLE_OBJECTID}`)
    assert.isObject(success.body, 'Success response received')
    assert.strictEqual(response.statusCode, 200, 'Response code success')
  })
})
