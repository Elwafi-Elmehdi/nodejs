const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		summary: {
			type: String,
		},
		title: {
			type: String,
			unique: true,
		},
		content: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
