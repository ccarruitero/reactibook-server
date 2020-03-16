const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../index');
const User = require('../../models/user');

const params = {
  email: 'test@example.com',
  password: 'strongPassword',
};
const errorMessage = 'Invalid email or password';

beforeEach(async () => {
  const user = new User({ email: params.email });
  user.setPassword(params.password);
  await user.save();
});

afterEach(() => {
  mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect();
  await server.close(done);
});

describe('new session', () => {
  test('should success with valid credentials', async () => {
    const response = await request(server).post('/auth')
      .send({ email: params.email, password: params.password });
    expect(response.statusCode).toBe(200);
    const { email, password, token } = response.body;
    expect(email).toBe(undefined);
    expect(password).toBe(undefined);
    expect(token).not.toBe(undefined);
  });
  test('should fail with invalid email', async () => {
    const response = await request(server).post('/auth')
      .send({ email: 'wrong@email.com' });
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe(errorMessage);
  });
  test('should fail with invalid password', async () => {
    const response = await request(server).post('/auth')
      .send({ email: params.email, password: 'wrong' });
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe(errorMessage);
  });
  test('should fail without parameters', async () => {
    const response = await request(server).post('/auth');
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe(errorMessage);
  });
});
