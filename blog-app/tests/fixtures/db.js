const { ObjectId } = require("mongoose");

// Models
const Post = require("../../src/models/post");
const User = require("../../src/models/user");
const Category = require("../../src/models/category");
const Comment = require("../../src/models/comment");
const Tag = require("../../src/models/tag");

const userOneId = new ObjectId();

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
	await User.deleteMany({});
	await Post.deleteMany({});
	await Comment.deleteMany({});
	await Tag.deleteMany({});
	await Category.deleteMany({});

	await User.save(userOne);
	await Category.save(categoryOne);
	await Category.save(categoryTwo);

	await Tag.save(tagOne);
	await Tag.save(tagTow);
};
