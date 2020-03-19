const express = require('express');

const router = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.validatePassword(password)) {
    res.status(200).json({ token: user.generateToken() });
  } else {
    res.status(422).json({ error: 'Invalid email or password' });
  }
});

router.post('/introspect', auth, (req, res) => {
  res.json({});
});

module.exports = router;
