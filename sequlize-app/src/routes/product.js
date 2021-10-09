const express = require("express");
const { sequelize, product } = require("../../models/");
const router = new express.Router();

router.post("/products", async (req, res) => {
	try {
		const { ref, category } = req.body;
		if (!ref || !category) {
			throw new Error("Client Input Error");
		}
		const producta = await product.create({
			ref,
			category,
		});
		res.send(producta);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.get("/products", async (req, res) => {
	try {
		const products = await product.find();
		res.send(products);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

module.exports = router;
