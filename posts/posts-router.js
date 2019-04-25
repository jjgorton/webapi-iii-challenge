const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
	db
		.get()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({ error: 'Oops, something went wrong!' });
		});
});

module.exports = router;
