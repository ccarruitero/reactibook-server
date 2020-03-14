const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../index');

afterEach(() => {
  mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await server.close(done);
  await mongoose.disconnect();
});

const params = { email: 'user@example.com', password: 'strongpassword123' };

describe('create user', () => {
  test('should success with valid parameters', async () => {
    const response = await request(server).post('/users')
      .send({ email: params.email, password: params.password });
    expect(response.statusCode).toBe(201);
    const { email, password } = response.body;
    expect(email).toBe(params.email);
    expect(password).toBe(undefined);
  });
  test('should fail without parameters', async () => {
    const response = await request(server).post('/users');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('ValidationError');
  });
  test('should fail without password parameter', async () => {
    const response = await request(server).post('/users')
      .send({ email: params.email });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('ValidationError');
  });
});
