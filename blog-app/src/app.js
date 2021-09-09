const express = require("express")
const app = express();
require('./db/mongoose')

const tagRouter = require('./routers/Tag')
const userRouter = require('./routers/User')
const categoryRouter = require('./routers/Category')

app.use(express.json())

app.use(userRouter)
app.use(categoryRouter)
app.use(tagRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log("Listening on ",PORT)
})
