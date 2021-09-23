const { initDB } = require("./fixtures/db");
const Category = require("../src/models/category");

beforeEach(initDB);

test("Should get categories from db", async () => {
	const categories = await Category.find({});
	expect(categories).not.toBeNull();
});
