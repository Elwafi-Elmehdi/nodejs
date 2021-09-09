const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const user1 = {
    firstname:"Reda",
    lastname:"hihi",
    email:"hehe@ewhhew.hehe",
    password:"hehehe1777!",
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(user1).save()
})

test('Should register a new user',async () => {
    await request(app).post('/users/register').send({
        firstname:"Mehdi",
        lastname:"hihi",
        email:"hehe@hehe.hehe",
        password:"hehehe1777!",
    }).expect(201)
})

test('Should login a user',async () => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    })
})
