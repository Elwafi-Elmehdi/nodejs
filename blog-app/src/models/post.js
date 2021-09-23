const mongoose = require("mongoose");
const { schema } = require("../models/tag");
const { categorySchema } = require("../models/category");

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
		category: categorySchema,
		tags: [schema],
		owner: {
			required: true,
			type: mongoose.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

postSchema.virtual("comments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "post",
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
