const request = require('supertest')
const app = require('../src/app')

test('Should register a new user',async () => {
    await request(app).post('/users/register').send({
        firstname:"Mehdi",
        lastname:"hihi",
        email:"hehe@hehe.hehe",
        password:"hehehe1777!",
    }).expect(201)
})
