const User = require('../src/models/User')
const app = require('../src/app')
const {userOne,userOneId,initDB} = require('./fixtures/db')

beforeEach(initDB)

test("Should setup userOne in db",async () => {
    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
});
