const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordSalt: String,
},
{
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.passwordSalt;
      return ret;
    },
  },
});

userSchema.method({
  setPassword(password) {
    if (!password) return;
    this.passwordSalt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 32, 'sha512').toString('hex');
  },
  validatePassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 32, 'sha512').toString('hex');
    return this.password === hash;
  },
  setAuthToken() {
    this.authToken = crypto.randomBytes(16).toString('hex');
    this.save();
  },
  generateToken() {
    const token = jwt.sign(this.toJSON(), process.env.JWT_SECRET, { expiresIn: '5h' });
    return token;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
