const request = require("supertest");
const User = require("../src/models/User");
const app = require("../src/app");
const { userOne, userOneId, initDB } = require("./fixtures/db");

beforeEach(initDB);

const userTwo = {
	firstname: "Reda",
	lastname: "ELwafi",
	email: "reda@mehdi.dev",
	password: "Hello,Wolrd@#",
};

test("Should setup userOne in db", async () => {
	const user = await User.findById(userOneId);
	expect(user._id).toMatchObject(userOneId);
});

test("Should not login to the count", async () => {
	const response = await request(app)
		.post("/users/login")
		.send({
			email: "mehdi@mehdi.dev",
			password: "Hello,Wolrd@#",
		})
		.expect(200);
	// expect(response.body).toMatchObject({
	// 	...userOne,
	// });a
});

test("Should register new user", async () => {
	await request(app)
		.post("/users")
		.send({
			...userTwo,
		})
		.expect(200);
});
