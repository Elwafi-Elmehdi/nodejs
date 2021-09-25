const {initDB,tags} = require('./fixtures/db')
const request = require('supertest')
const app = require('../src/app')

beforeEach(initDB)

test("Should get all the tags",async () => {
    const response = await request(app)
        .get('/tags/all')
        .send()
        .expect(200)
    expect(response.body).toHaveLength(2)
})

test("Should get tag with title",async () => {
    const response = await request(app)
        .get('/tags/CSS')
        .send()
        .expect(200);
    expect(response.body).toEqual(tags[1])
})


