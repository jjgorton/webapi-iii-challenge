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

// router.get('/:id', (req, res) => {
// 	const postId = req.params;
// 	console.log(req.params);
// 	if (!postId) {
// 		res.status(404).json({ message: 'The post with the specified ID does not exist.' });
// 	} else {
// 		db
// 			.getById(postId)
// 			.then((post) => {
// 				res.status(200).json(post);
// 			})
// 			.catch((err) => {
// 				res.status(500).json({ error: 'The post information could not be retrieved.' });
// 			});
// 	}
// });

router.get('/:id', (req, res) => {
	const postId = req.params.id;
	db
		.getById(postId)
		.then((post) => {
			console.log(post.id);
			if (post.length === 0) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post information could not be retrieved.' });
		});
});

router.post('/', (req, res) => {
	const postData = req.body;
	db
		.insert(postData)
		.then((post) => {
			if (!postData.text) {
				res.status(400).json({ errorMessage: 'Please provide valid texts in this post.' });
			} else {
				res.status(201).json(post);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the post to the database' });
		});
});

router.delete('/:id', (req, res) => {
	const postId = req.params.id;
	console.log('delete');
	db
		.remove(postId)
		.then((post) => {
			if (!post) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			} else {
				res.status(204).end();
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const postId = req.params.id;
	const postData = req.body;
	db
		.update(postId, postData)
		.then((post) => {
			if (!post) {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
			if (!postData.text) {
				res.status(400).json({ errorMessage: 'Please provide valid text for the post.' });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The post information could not be modified.' });
		});
});

module.exports = router;
