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

router.get("/posts/:id", auth, async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.status(400).send({ error: "user error" });
		}
		const post = await Post.findOne({ _id: id });
		res.send(post);
	} catch (error) {
		res.status(500).send();
	}
});

router.delete("/posts/:id", auth, async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.status(400).send({ error: "user error" });
		}
		const post = await Post.deleteOne({ _id: id, owner: req.user._id });
		res.send(post);
	} catch (error) {
		res.status(500).send();
	}
});

router.get("/posts", async (req, res) => {
	try {
		const posts = await Post.find({});
		res.send(posts);
	} catch (error) {
		res.status(500).send();
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
