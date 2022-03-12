const request = require('supertest');
const _app = require('../app');
const sequelize = require('../models').sequelize;
const User = require('../models').User;

const app = _app();

describe('POST /rides', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new user', (done) => {
    const data = {
      name: 'john doe',
      email: 'john@dose2.com',
      password: '12345678',
    };

    const payload = JSON.parse(JSON.stringify(data));
    request(app)
      .post('/api/users')
      .send(payload)
      .expect(function (res) {
        // TODO: CHECK RESPONSE HAS TOKEN, CHECK DB HAS USER
      })
      .expect(200, done);
  });

  it('should not create a user with the same email', async () => {
    const data = {
      name: 'john doe',
      email: 'john@dose3.com',
      password: '12345678',
    };

    await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const payload = JSON.parse(JSON.stringify(data));
    const response = await request(app).post('/api/users').send(payload);
    expect(response.statusCode).toBe(400);
  });

  it('should not create a user with password length < 8', async () => {
    const data = {
      name: 'john doe',
      email: 'john@dose3.com',
      password: '1234567',
    };

    await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const payload = JSON.parse(JSON.stringify(data));
    const response = await request(app).post('/api/users').send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe(
      'please enter password with 8 or more characters'
    );
  });

  it('should throw error if body is incomplete', async () => {
    const data = {
      email: 'john@dose3.com',
      password: '1234567',
    };

    const payload = JSON.parse(JSON.stringify(data));
    const response = await request(app).post('/api/users').send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe('name is required');
  });

  it('should throw error if name is empty', async () => {
    const data = {
      name: '',
      email: 'john@dose3.com',
      password: '12345678',
    };

    const payload = JSON.parse(JSON.stringify(data));
    const response = await request(app).post('/api/users').send(payload);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe('name is required');
  });
});
