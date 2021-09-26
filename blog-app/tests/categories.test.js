const { initDB,categories } = require("./fixtures/db");
const { Category } = require("../src/models/category");
const request = require('supertest')
const app = require('../src/app')

beforeEach(initDB);

test("Should get all categories", async () => {
    const response = await request(app)
        .get('/categories/all')
        .send()
        .expect(200)
    expect(response.body).toHaveLength(2)
});

test("Should not delete any category")