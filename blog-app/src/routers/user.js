const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/", (req, res) => {
	res.send("Hello, World!");
});

router.post("/users", async (req, res) => {
	try {
		const user = new User({ ...req.body });
		await user.save();
		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

router.post("/users/login", async (req, res) => {});

module.exports = router;
