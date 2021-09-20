const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bycrpt = require;

const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
			validate(age) {
				if (age <= 0) {
					throw new Error("Age is not valid.");
				}
			},
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre;

const User = new mongoose.model("User", userSchema);

module.exports = User;
