const express = require('express');
const cors = require('cors');

const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json());
server.use(cors());

const upCase = (req, res, next) => {
	const upName = req.body.name;
	if (upName) {
		req.body.name = upName.toUpperCase();
		next();
	} else {
		next();
	}
};

server.get('/', (req, res) => {
	res.send(`
    <h1>Users Can Post!</h1>
    `);
});

server.use('/api/posts', postsRouter);
server.use('/api/users', upCase, usersRouter);

module.exports = server;
