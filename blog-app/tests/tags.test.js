const {initDB} = require('./fixtures/db')
const request = require('supertest')
const app = require('../src/app')

beforeEach(initDB)

