const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../app')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Test app.js', () => {
  it('Should return array of todos', async () => {
    const response = await chai.request(app).get('/')
    assert.strictEqual(response.statusCode, 200, 'Response code success')
    assert.isDefined(response.body, 'Response body is defined')
    assert.isArray(response.body)
  })

  it('Should add a todo', async () => {
    const success = await chai.request(app).post('/').send({ _id: 0x000, title: 'This is a new todo', body: 'This todo has a body' })
    const response = await chai.request(app).get('/')
    assert.strictEqual(response.statusCode, 200, 'Reponse code success')
    assert.isTrue(success.body, 'Success response received')
    assert.isNotEmpty(response.body, 'Array has at least one todo')
  })
})
