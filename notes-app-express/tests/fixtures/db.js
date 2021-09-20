const mongoose = require("mongoose");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
	_id: userOneId,
	firstname: "Mehdi",
	lastname: "ELwafi",
	email: "mehdi@mehdi.dev",
	password: "Hello,Wolrd@#",
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN),
		},
	],
};

const initDB = async () => {
	await User.deleteMany();
	await new User(userOne).save();
};

module.exports = {
	userOneId,
	userOne,
	initDB,
};
