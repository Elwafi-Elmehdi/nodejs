const app = require("./src/app");
const { sequelize } = require("./models/index");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await sequelize.sync();
	console.log("Server running on ", PORT);
});
