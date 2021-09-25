const mongoose = require("mongoose");

// Models
const Post = require("../../src/models/post");
const User = require("../../src/models/user");
const {Category} = require("../../src/models/category");
const Comment = require("../../src/models/comment");
const {Tag} = require("../../src/models/tag");

const userOneId = mongoose.Types.ObjectId();

const userOne = {
	_id: userOneId,
	age: 22,
	email: "test@mehdi.dev",
	password: "Tests$@&",
	fullname: "Blog Tests",
};

const tagOne = {
	title: "HTML",
	content: "HTML 5",
};

const tagTow = {
	title: "CSS",
	content: "CSS4",
};

const categoryOne = {
	title: "features",
	content: "",
};

const categoryTwo = {
	title: "bugs",
	content: "",
};

const initDB = async () => {
	await User.deleteMany();
	await Post.deleteMany();
	await Comment.deleteMany();
	await Tag.deleteMany();
	await Category.deleteMany();

	await new User(userOne).save();
	await new Category(categoryOne).save();
	await new Category(categoryTwo).save();

	await new Tag(tagOne).save();
	await new Tag(tagTow).save();
};

const tags = [tagOne, tagTow];
const categories = [categoryOne, categoryTwo];

module.exports = {
	initDB,
	userOneId,
	userOne,
	categories,
	tags,
};
