const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../index');
const User = require('../../models/user');
const Post = require('../../models/post');

const params = { email: 'user@example.com', password: 'strongpassword123' };
let token;
let post;

beforeEach(async () => {
  const user = new User({ email: params.email });
  user.setPassword(params.password);
  await user.save();
  token = user.generateToken();
  post = await Post.create({
    text: 'an important message',
    sharedWith: 'public',
    user: user.id,
  });
});

afterEach(() => {
  mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect();
  await server.close(done);
});

describe('create post', () => {
  test('should success with valid parameters', async () => {
    const response = await request(server).post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        sharedWith: 'friends',
      });
    expect(response.statusCode).toBe(201);
  });
  test('should fail with invalid parameters', async () => {
    const response = await request(server).post('/posts')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toContain('ValidationError');
  });
  test('should fail without token', async () => {
    const response = await request(server).post('/posts')
      .send({
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      });
    expect(response.statusCode).toBe(401);
  });
});

describe('edit post', () => {
  test('should success', async () => {
    const response = await request(server).put(`/posts/${post.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'new post message' });
    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe('new post message');
  });
  test('with invalid field', async () => {
    const response = await request(server).put(`/posts/${post.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ input: 'new post message' });
    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe('an important message');
  });
});

describe('delete post', () => {
  test('should success if post for user', async () => {
    const response = await request(server).delete(`/posts/${post.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  });
  test('should fail if not post', async () => {
    const response = await request(server).delete('/posts/124155')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('list posts', () => {
  test('should success with only user posts', async () => {
    await Post.create({
      text: 'an important message 2',
      sharedWith: 'public',
      user: '214124125125',
    });
    expect(await Post.find().countDocuments()).toBe(2);

    const response = await request(server).get('/posts')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
