const express = require("express")
const app = express();
require('./db/mongoose')
const userRouter = require('./routers/User')

app.use(express.json())
app.use(userRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log("Listening on ",PORT)
})
