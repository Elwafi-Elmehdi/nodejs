const express = require("express")
const app = express();
require('./db/mongoose')

const tagRouter = require('./routers/tag')
const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category')

app.use(express.json())

app.use(userRouter)
app.use(categoryRouter)
app.use(tagRouter)

module.exports = app
