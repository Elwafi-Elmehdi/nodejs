const express = require("express");
const router = new express.Router();
const Post = require("../models/post");

router.get("/posts/", async (req, res) => {
	res.send("Hell from post router");
});

module.exports = router;
