const express = require("express");
const router = new express.Router();
const Post = require("../models/post");

router.post("/posts", async (req, res) => {
	try {
		const task = new Post({ ...req.body });
		await task.save();
		res.send(task);
	} catch (error) {
		res.send({ error });
	}
});

module.exports = router;
