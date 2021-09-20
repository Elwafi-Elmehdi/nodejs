const express = require("express");
const router = new express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");

router.post("/posts", auth, async (req, res) => {
	try {
		const post = new Post({ ...req.body, owner: req.user._id });
		await post.save();
		res.send(post);
	} catch (error) {
		res.send({ error });
	}
});

module.exports = router;
