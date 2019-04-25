const express = require('express');

const db = require('./userDb');

const router = express.Router();

router.get('/', (req, res) => {
	db
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ error: 'No!' });
		});
});

router.get('/:id', (req, res) => {
	const userId = req.params.id;
	db
		.getById(userId)
		.then((user) => {
			console.log(user.length);
			if (user.length === 0) {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: "This user's information could not be retrieved." });
		});
});

router.get('/:id/posts', (req, res) => {
	const userId = req.params.id;
	db
		.getUserPosts(userId)
		.then((user) => {
			console.log(user.length);
			if (user.length === 0) {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: "This user's posts could not be retrieved." });
		});
});

router.post('/', (req, res) => {
	const userData = req.body;
	if (userData.name && userData.name.length > 0) {
		db
			.insert(userData)
			.then((user) => {
				// if (userData.name.length === 0) {
				// 	res.status(400).json({ errorMessage: 'Please provide a username.' });
				// } else {
				res.status(201).json(user);
				// }
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the user to the database' });
			});
	} else {
		res.status(400).json({ errorMessage: 'Please provide a valid username.' });
	}
});

router.delete('/:id', (req, res) => {
	const userId = req.params.id;
	db
		.remove(userId)
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			} else {
				res.status(204).end();
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const userId = req.params.id;
	const userData = req.body;
	if (!userId) {
		res.status(404).json({ message: 'The user with the specified ID does not exist.' });
	}
	if (!userData.name || userData.name.length === 0) {
		res.status(400).json({ errorMessage: 'Please provide a valid username.' });
	} else {
		db
			.update(userId, userData)
			.then((user) => {
				res.status(200).json(user);
			})
			.catch((err) => {
				res.status(500).json({ error: 'The user information could not be modified.' });
			});
	}
});

module.exports = router;
