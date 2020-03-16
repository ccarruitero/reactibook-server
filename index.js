const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;
const routes = require('./routes');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/users', routes.users);
app.use('/auth', routes.sessions);
app.use('/posts', routes.posts);

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
};
mongoose.connect(process.env.DATABASE_URL, mongooseOptions);

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;
