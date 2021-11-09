const mongo = require("mongoose");

mongo.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
});
