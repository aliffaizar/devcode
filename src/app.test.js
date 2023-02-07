const supertest = require('supertest')
const app = require('./app')
const db = require('./config/database')
const Activity = require('./models/activity-model')

const dummyActivity = [
  {
    title: 'Test',
    email: 'test@test.com',
  },
  {
    title: 'Test 2',
    email: 'test12@mail.com',
  },
  {
    title: 'Test 3',
    email: 'email@test.com',
  },
]

beforeAll(async () => {
  await db.sync({ force: true })
  await Activity.create(dummyActivity[0])
})

afterAll(async () => {
  await db.close()
})

describe('GET /activity-groups/:id', () => {
  it('should return 200 OK', async () => {
    const res = await supertest(app).get('/activity-groups/1')
    expect(res.status).toBe(200)
  })
  it('should return an object with data property', async () => {
    const res = await supertest(app).get('/activity-groups/1')
    const { data } = res.body
    const { id, title, email } = data
    expect(res.body).toHaveProperty('data')
    expect(data).toBeInstanceOf(Object)
    expect(id).toBe(1)
    expect(title).toBe('Test')
    expect(email).toBe('test@test.com')
  })

  it('should return 404 Not Found', async () => {
    const res = await supertest(app).get('/activity-groups/2')
    expect(res.status).toBe(404)
  })

  it('should return an object with status and message', async () => {
    const res = await supertest(app).get('/activity-groups/2')
    expect(res.body).toBeInstanceOf(Object)
    const { status, message } = res.body
    expect(status).toBe('Not Found')
    expect(message).toBe('Activity with ID 2 Not Found')
  })
})

describe('GET /activity-groups', () => {
  it('should return 200 OK', async () => {
    const res = await supertest(app).get('/activity-groups')
    expect(res.status).toBe(200)
  })
  it('should return an object with data property', async () => {
    const res = await supertest(app).get('/activity-groups')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toBeInstanceOf(Array)
  })
})

describe('POST /activity-groups', () => {
  it('should return 201 Created', async () => {
    const res = await supertest(app)
      .post('/activity-groups')
      .send(dummyActivity[1])
    expect(res.status).toBe(201)
  })
  it('should return an object with data property', async () => {
    const res = await supertest(app)
      .post('/activity-groups')
      .send({ title: 'Test 2', email: 'test@test.com' })
    expect(res.body).toHaveProperty('data')
    const { data, status, message } = res.body
    expect(data).toBeInstanceOf(Object)
    expect(status).toBe('Success')
    expect(message).toBe('Success')
  })
  it('should return 400 Bad Request and return an object with property status and message', async () => {
    const res = await supertest(app)
      .post('/activity-groups')
      .send({ title: 'Test 2' })
    expect(res.status).toBe(400)
    expect(res.body).toBeInstanceOf(Object)
    const { status, message } = res.body
    expect(status).toBe('Bad Request')
    expect(message).toBe('email cannot be null')
  })

  it('should return 400 Bad Request and return an object with property status and message', async () => {
    const res = await supertest(app)
      .post('/activity-groups')
      .send({ email: 'test@test.com' })
    expect(res.status).toBe(400)
    expect(res.body).toBeInstanceOf(Object)
    const { status, message } = res.body
    expect(status).toBe('Bad Request')
    expect(message).toBe('title cannot be null')
  })
})

describe('PATCH /activity-groups/:id', () => {
  it('should return 200 OK', async () => {
    const res = await supertest(app)
      .patch('/activity-groups/1')
      .send({ title: 'Test 3', email: 'test@test123.com' })
    expect(res.status).toBe(200)
  })

  it('should return an object with data, message, and status property', async () => {
    const res = await supertest(app)
      .patch('/activity-groups/1')
      .send({ title: 'Test 3', email: 'email@test.com' })

    expect(res.body).toBeInstanceOf(Object)
    const { data, message, status } = res.body
    expect(data).toBeInstanceOf(Object)
    expect(message).toBe('Success')
    expect(status).toBe('Success')
  })

  it('should return 404 Not Found', async () => {
    const res = await supertest(app)
      .patch('/activity-groups/24')
      .send({ title: 'Test 3', email: 'email@email.com' })
    expect(res.status).toBe(404)
  })

  it('should return an object with status and message', async () => {
    const res = await supertest(app)
      .patch('/activity-groups/25')
      .send({ title: 'Test 3' })
    expect(res.body).toBeInstanceOf(Object)
    const { status, message } = res.body
    expect(status).toBe('Not Found')
    expect(message).toBe('Activity with ID 25 Not Found')
  })
})

describe('DELETE /activity-groups/:id', () => {
  it('should return 200 OK', async () => {
    const res = await supertest(app).delete('/activity-groups/1')
    expect(res.status).toBe(200)
  })

  it('should return an object with data, message, and status property', async () => {
    const res = await supertest(app).delete('/activity-groups/2')
    expect(res.body).toBeInstanceOf(Object)
    const { data, message, status } = res.body
    expect(data).toBeInstanceOf(Object)
    expect(message).toBe('Success')
    expect(status).toBe('Success')
  })

  it('should return 404 Not Found', async () => {
    const res = await supertest(app).delete('/activity-groups/224234')
    expect(res.status).toBe(404)
  })

  it('should return an object with status and message', async () => {
    const res = await supertest(app).delete('/activity-groups/224234')
    expect(res.body).toBeInstanceOf(Object)
    const { status, message } = res.body
    expect(status).toBe('Not Found')
    expect(message).toBe('Activity with ID 224234 Not Found')
  })
})

describe('GET /todo-items', () => {
  it('should return 200 OK', async () => {
    const res = await supertest(app).get('/todo-items')
    expect(res.status).toBe(200)
  })
  it('should return an object with data property', async () => {
    const res = await supertest(app).get('/todo-items')
    expect(res.body).toHaveProperty('data')
    expect(res.body.message).toBe('Success')
    expect(res.body.status).toBe('Success')
    expect(res.body.data).toBeInstanceOf(Array)
  })
})

describe('POST /todo-items', () => {})
