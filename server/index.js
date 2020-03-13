const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;
const routes = require('./routes');

app.use(express.json());

app.use('/users', routes.users);
// app.use('/sessions', routes.sessions)
// app.use('/posts', routes.posts)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;
