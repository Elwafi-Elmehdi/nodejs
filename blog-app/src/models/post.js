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
		owner: {
			required: true,
			type: mongoose.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
