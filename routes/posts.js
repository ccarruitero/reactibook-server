const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

const getUser = async (decoded) => {
  const { email } = decoded;
  const user = await User.findOne({ email });
  return user;
};

router.use(auth);

router.post('/', async (req, res) => {
  const user = await getUser(req.decoded);
  await Post.create({ ...req.body, user: user.id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(422).json({ error: `${error.name}: ${error.message}` });
    });
});

router.put('/:postId', async (req, res) => {
  const user = await getUser(req.decoded);
  const { postId } = req.params;
  await Post.findOneAndUpdate({ _id: postId, user: user.id }, req.body, { new: true })
    .then((post) => res.json(post))
    .catch(() => res.status(404).json());
});

router.delete('/:postId', async (req, res) => {
  const user = await getUser(req.decoded);
  const { postId } = req.params;
  await Post.findOneAndDelete({ _id: postId, user: user.id })
    .then(() => res.status(204).json())
    .catch(() => res.status(404).json());
});

router.get('/', async (req, res) => {
  const user = await getUser(req.decoded);
  const posts = await Post.find({ user: user.id });

  res.json(posts);
});

module.exports = router;
