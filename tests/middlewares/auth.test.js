const mongoose = require('mongoose');
const auth = require('../../middlewares/auth');
const User = require('../../models/user');

const mockSetup = (token = null) => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  const req = {};
  req.get = jest.fn().mockReturnValue(token);
  const next = jest.fn();

  return [req, res, next];
};

const setupUser = async () => {
  const user = new User({ email: 'example@mail.me' });
  user.setPassword('1235');
  await user.save();
  return user;
};

beforeAll(() => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
});

afterEach(() => {
  mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect();
  done();
});

describe('auth middleware', () => {
  test('valid token should return user email', async () => {
    const user = await setupUser();
    const token = user.generateToken();
    const [req, res, next] = mockSetup(`Bearer ${token}`);

    auth(req, res, next);
    expect(req.decoded.email).toBe(user.email);
    expect(next).toHaveBeenCalled();
  });
  test('invalid valid token return 401', () => {
    const [req, res, next] = mockSetup('bfsabfkasfkl');
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });
  test('no token return 401', () => {
    const [req, res, next] = mockSetup();
    auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
