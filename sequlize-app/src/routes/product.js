const express = require("express");
const { sequelize, Product } = require("../../models/");
const router = new express.Router();

router.post("/products", async (req, res) => {
	try {
		const { ref, category } = req.body;
		if (!ref || !category) {
			throw new Error("Client Input Error");
		}
		const product = await Product.create({
			ref,
			category,
		});
		res.send(product);
	} catch (error) {
		res.status(500).send(error);
	}
});
