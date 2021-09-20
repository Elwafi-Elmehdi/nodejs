const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
	try {
		const token = req.get("Authorization").replace("Bearer ", "");
		if (!token) {
			throw new Error("UNAUTHENTICATED");
		}
		const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
		const user = await User.findOne({ _id: decoded._id });
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		return res.status(401).send({ error });
	}
};

module.exports = auth;
