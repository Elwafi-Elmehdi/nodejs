const express = require("express");
const { Tag } = require("../models/tag");
const router = new express.Router();

router.post("/tags", async (req, res) => {
	try {
		const tag = new Tag({ ...req.body });
		await tag.save();
		res.send(tag);
	} catch (e) {
		res.status(400).send({ error: "User Error" });
	}
});

router.get("/tags/:title", async (req, res) => {
	try {
		const title = req.params.title;
		const tag = await Tag.findOne({ title });
		res.send(tag);
	} catch (error) {
		res.status(500).send();
	}
});

router.get("/tags/all", async (req, res) => {
	try {
		const tags = await Tag.find({});
		res.send(tags);
	} catch (error) {
		res.status(500).send();
	}
});

router.delete("/tags/:title", async (req, res) => {
	try {
		const title = req.params.title;
		const tag = await Tag.deleteOne({ title });
		res.send(tag);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
