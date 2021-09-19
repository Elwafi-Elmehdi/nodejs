const express = require("express");
const app = express();
require("./db/mongoose");
const userRouter = require("./routes/User");
const noteRouter = require("./routes/Note");

// Routes
app.use(userRouter);
app.use(noteRouter);

app.use(express.json());

module.exports = app;
