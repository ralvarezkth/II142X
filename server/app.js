const express = require("express");
const createError = require("http-errors");
var bodyParser = require("body-parser");

const GuardRouter = require("./router/guardRouter");
const StudentRouter = require("./router/studentRouter");

const app = express();

app.use(express.json());

app.use("/api/guard", GuardRouter);
app.use("/api/student", StudentRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;