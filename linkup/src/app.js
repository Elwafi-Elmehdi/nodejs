const express = require("express");
const app = express();
require("./db/mongo");

app.use(express.json());

module.exports = app;
