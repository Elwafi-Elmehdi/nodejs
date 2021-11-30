const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
	fullname: {
		type: string,
		required: true,
	},
	email: {
		type: string,
		required: true,
		unique: true,
	},
});

const Link = mongoose.model("Link", userSchema);

module.exports = Link;
