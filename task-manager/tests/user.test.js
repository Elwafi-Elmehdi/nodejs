const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const user1Id = new mongoose.Types.ObjectId();
const user1 = {
	_id: user1Id,
	firstname: "Reda",
	lastname: "hihi",
	email: "hehe@ewhhew.hehe",
	password: "hehehe1777!",
	tokens: [
		{
			token: jwt.sign({ _id: user1Id }, process.env.JWT_TOKEN),
		},
	],
};

beforeEach(async () => {
	await User.deleteMany();
	await new User(user1).save();
});

test("Should register a new user", async () => {
	const response = await request(app)
		.post("/users/register")
		.send({
			firstname: "Mehdi",
			lastname: "hihi",
			email: "hehe@hehe.hehe",
			password: "hehehe1777!",
		})
		.expect(201);

	// Assert user is correctly registered
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assert response body is correct
	expect(response.body).toMatchObject({
		user: {
			firstname: "Mehdi",
			lastname: "hihi",
			email: "hehe@hehe.hehe",
		},
		token: user.tokens[0].token,
	});
	//Assert user password is encrypted
	expect(user.password).not.toBe("hehehe1777!");
});

test("Should login a user", async () => {
	const response = await request(app)
		.post("/users/login")
		.send({
			email: user1.email,
			password: user1.password,
		})
		.expect(200);
	const user = await User.findById(user1Id);
	expect(user.tokens[1].token).toBe(response.body.token);
});

test("Should not login unkown user", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: user1.email,
			password: "passsqw7784@",
		})
		.expect(404);
});

test("Should get user profile", async () => {
	await request(app)
		.get("/users/me")
		.set("Authorization", `Bearer ${user1.tokens[0].token}`)
		.send()
		.expect(200);
});

test("Should not get profile", async () => {
	await request(app).get("/users/me").send().expect(401);
});

test("Should delete user acount", async () => {
	const response = await request(app)
		.delete("/users/me")
		.set("Authorization", `Bearer ${user1.tokens[0].token}`)
		.expect(200);
	const user = await User.findById(response.body._id);
	expect(user).toBeNull();
});

test("Should not delete any user no auth", async () => {
	await request(app).delete("/users/me").send().expect(401);
});

test("Should set avatar", async () => {
	const response = await request(app)
		.post("/users/me/avatar")
		.set("Authorization", `Bearer ${user1.tokens[0].token}`)
		.attach("avatar", "avatars/default-avatar.png")
		.expect(200);

	const user = await User.findById(user1Id);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should not update invalid fields", async () => {
	await request(app)
		.patch(`/user/${user1Id}`)
		.set("Authorization", `Bearer ${user1.tokens[0].token}`)
		.send({
			localation: "Marrakech, 758 Gueliz",
			cin: "JSAJQ175",
		})
		.expect(400);
});

test("Should set updates for user model", async () => {
	await request(app)
		.patch(`/user/${user1Id}`)
		.set("Authorization", `Bearer ${user1.tokens[0].token}`)
		.send({
			firstname: "Mehdi",
			lastname: "Reda",
			email: "mehdi@ewhhew.hehe",
		})
		.expect(200);
	const user = await User.findById(user1Id);
	expect(user).toMatchObject({
		firstname: "Mehdi",
		lastname: "Reda",
		email: "mehdi@ewhhew.hehe",
	});
});
