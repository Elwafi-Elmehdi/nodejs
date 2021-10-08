require("../db/db");
const { DataTypes, Model } = require("sequelize");

class Product extends Model {}

Product.init({
	ref: {
		type: DataTypes.STRING,
	},
	category: {
		type: DataTypes.STRING,
	},
});
