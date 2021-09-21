const express = require("express");
const app = express();
require("./db/mongoose");

const tagRouter = require("./routers/tag");
const userRouter = require("./routers/user");
const commentRouter = require("./routers/comment");
const categoryRouter = require("./routers/category");
const postRouter = require("./routers/post");

app.use(express.json());

app.use(userRouter);
app.use(categoryRouter);
app.use(tagRouter);
app.use(postRouter);
app.use(commentRouter);

module.exports = app;
