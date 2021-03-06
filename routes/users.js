const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  newUser.setPassword(req.body.password);
  await newUser.save()
    .then((user) => {
      res.status(201).json({ token: user.generateToken() });
    })
    .catch((error) => {
      res.status(422).json({ error: `${error.name}: ${error.message}` });
    });
});

module.exports = router;
