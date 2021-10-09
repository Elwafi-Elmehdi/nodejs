const app = require("./src/app");
const { sequelize } = require("./models/index");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
	await sequelize.sync({ alter: true });
	console.log("Server running on ", PORT);
});
