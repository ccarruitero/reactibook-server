const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.validatePassword(password)) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

module.exports = router;
