const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
