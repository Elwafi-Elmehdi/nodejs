const { Schema, model, ObjectId } = require("mongoose");

const commentSchema = new Schema(
	{
		title: {
			type: String,
		},
		content: {
			required: true,
			type: String,
		},
		owner: {
			required: true,
			type: ObjectId,
		},
		post: {
			required: true,
			type: ObjectId,
		},
	},
	{ timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
