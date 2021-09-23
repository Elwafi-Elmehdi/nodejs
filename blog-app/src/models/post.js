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
		category: {
			type: mongoose.Types.ObjectId,
		},
		owner: {
			required: true,
			type: mongoose.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
