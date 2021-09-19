const request = require("supertest");
const User = require("../src/models/User");
const app = require("../src/app");
const { userOne, userOneId, initDB } = require("./fixtures/db");

beforeEach(initDB);

test("Should setup userOne in db", async () => {
	const user = await User.findById(userOneId);
	expect(user._id).toMatchObject(userOneId);
});

test("Should not login to the count", async () => {
	const response = await request(app)
		.post("/login")
		.send({
			email: userOne.email,
			passowd: userOne.password,
		})
		.expect(200);
	expect(response.body).toMatchObject({
		...userOne,
	});
});
