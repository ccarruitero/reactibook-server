const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordSalt: String,
  passwordHash: String,
  authToken: {
    type: String,
    unique: true,
  },
});

userSchema.method({
  setPassword: (password) => {
    if (!password) return;
    this.passwordSalt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 32, 'sha512').toString('hex');
  },
  validatePassword: (password) => {
    const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 32, 'sha512').toString('hex');
    return this.passwordHash === hash;
  },
  setAuthToken: () => {
    this.authToken = crypto.randomBytes(16).toString('hex');
    this.save();
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
