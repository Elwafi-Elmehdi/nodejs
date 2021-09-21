const express = require("express");
const router = new express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.post("/posts", auth, async (req, res) => {
	try {
		const post = new Post({ ...req.body, owner: req.user._id });
		await post.save();
		res.send(post);
	} catch (error) {
		res.send({ error });
	}
});

router.get("/posts/all", auth, async (req, res) => {
	try {
		const id = req.user._id;
		const posts = await Post.find({ owner: id });
		// const posts = req.user.populate("tasks");
		return res.send(posts);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
