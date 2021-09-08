const express = require("express")
const app = express();
require('./db/mongoose')

app.use(express.json)

const PORT = process.env.PORT || 3000

app.listen(() => {
    console.log("Listening on ",PORT)
})
