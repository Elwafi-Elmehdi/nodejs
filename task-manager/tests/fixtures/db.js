const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");

const user1Id = new mongoose.Types.ObjectId();
const user1 = {
	_id: user1Id,
	firstname: "Reda",
	lastname: "hihi",
	email: "hehe@ewhhew.hehe",
	password: "hehehe1777!",
	tokens: [
		{
			token: jwt.sign({ _id: user1Id }, process.env.JWT_TOKEN),
		},
	],
};

const setUpDB = async () => {
	await User.deleteMany();
	await new User(user1).save();
};
