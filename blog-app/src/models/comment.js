const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
	{
		title: {
			type: String,
		},
		content: {
			required: true,
			type: String,
		},
	},
	{ timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
