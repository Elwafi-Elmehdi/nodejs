const mongoose = require("mongoose");
const { schema } = require("../models/tag");
const { categorySchema, Category } = require("../models/category");

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

postSchema.pre("save", async function (next) {
	const post = this;
	const category = await Category.findOne({ title: post.category.title });
	post.category = category;
	next();
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
