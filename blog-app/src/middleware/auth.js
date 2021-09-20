const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
	try {
		const token = req.get("Authorization").replace("Bearer ", "");
		if (!token) {
			throw new Error("UNAUTHENTICATED");
		}
		next();
	} catch (error) {
		return res.status(401).send({ error });
	}
};

module.exports = auth;
