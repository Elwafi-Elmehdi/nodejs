const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

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

const user2Id = new mongoose.Types.ObjectId();
const user2 = {
	_id: user2Id,
	firstname: "Mehdi",
	lastname: "hihi",
	email: "mehdi@ewhhew.hehe",
	password: "washasat#14!",
	tokens: [
		{
			token: jwt.sign({ _id: user2Id }, process.env.JWT_TOKEN),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	label: "First Task",
	desc: "1",
	completed: false,
	owner: user1Id,
};

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	label: "Second Task",
	desc: "2",
	completed: true,
	owner: user1Id,
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	label: "Thierd Task",
	desc: "2",
	completed: false,
	owner: user2Id,
};

const setUpDB = async () => {
	await User.deleteMany();
	await Task.deleteMany();

	await new User(user1).save();
	await new User(user2).save();

	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};

module.exports = {
	user1Id,
	user1,
	user2,
	setUpDB,
	taskTwo,
};
