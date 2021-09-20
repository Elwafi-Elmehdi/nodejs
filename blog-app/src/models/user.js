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
		phone: {
			type: String,
			max: 10,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async (next) => {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bycrpt.hash(
			user.password,
			process.env.PASSWORD_SALT
		);
	}
	next();
});

// userSchema.methods.toJSON = function () {
// 	const user = this;
// 	return user;
// };

const User = new mongoose.model("User", userSchema);

module.exports = User;
